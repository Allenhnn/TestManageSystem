const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require("path")
const fs = require('fs');
const { spawn } = require('child_process');
const { sequelize, userAccounts, fileInfo, jsonFile } = require('../sqlSetting');
const { where, json, AsyncQueueError } = require('sequelize');
const nodemailer = require("nodemailer")

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const extName = path.extname(file.originalname)
    const userName = req.cookies.userName
    const filePath = req.cookies.fileName
    const baseUserDir = path.join(__dirname, '..', 'user_data') // 絕對基底指向 back-end/user_data
    let folderPath = ''
    if (extName === ".xlsx") {
      folderPath = path.join(baseUserDir, userName, filePath)
    } else if (extName === ".jpg") {
      folderPath = path.join(baseUserDir, userName, filePath, 'image')
    } else if (extName === ".docx") {
      folderPath = path.join(__dirname, '..', 'docxTemplate')
    }
    // 確保目錄存在
    fs.mkdirSync(folderPath, { recursive: true })
    cb(null, folderPath)
  },
  // destination: function (req, file, cb) {
    
  //   // console.log(fill.originalName);
  //   const extName = path.extname(file.originalname)
  //   const userName = req.cookies.userName
  //   const filePath = req.cookies.fileName
  //   let folderPath = ''
  //   if (extName === ".xlsx") {
  //     folderPath = `../user_data/${userName}/${filePath}`
  //   } else if (extName === ".jpg") {
  //     folderPath = `../user_data/${userName}/${filePath}/image`
  //   } else if (extName === ".docx") {
  //     folderPath = `../docxTemplate`
  //     // const delPath  = path.join(__dirname , "docxTemplate"  , "wordTemplate1(new).docx")      
  //     // fs.rmSync(delPath )
  //   }
  //   cb(null, folderPath)
  // },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname)
    let uploadFileName = ""
    if (extName === ".xlsx") {
      uploadFileName = req.cookies.fileName + ".xlsx"
    } else if (extName === ".jpg") {
      uploadFileName = file.originalname
    } else {
      uploadFileName = "wordTemplate.docx"
    }
    cb(null, uploadFileName)
  }
})


const upload = multer({ storage: storage })

router.post('/uploadWordTem', upload.single("uploadWordTem"), (req, res) => {
  res.status(200).send('success')
})

router.post('/upload', upload.fields([{ name: 'excelFile' }, { name: 'photoFile' }]), async (req, res) => {
  console.log("reqBOdy:", req.body)
  const userName = req.cookies.userName
  const fileName = req.cookies.fileName
  const excelFile = req.body.originalName
  const filePath = `./user_data/${userName}/${fileName}/${excelFile}.xlsx`

  const py = await spawn('python3', ['process.py', filePath, userName, fileName])
  let outputData = ''
  py.stdout.on('data', (data) => {
    outputData += data.toString('utf-8')
  })

  py.stderr.on('data', (data) => {
    console.log(data.toString('utf-8'));
  })

  py.on('close', () => {
    console.log(outputData)
    sequelize.sync().then(() => {
      jsonFile.create({
        jsonName: fileName,
        userAcc: userName
      }).then(() => {
        console.log("Json File has already prepared")
        res.send('success').status(200)
      }).catch(err => {
        console.log(err.name)
        res.send('failure').status(400)
      })
    })
  })
})

router.post('/signup', (req, res) => {
  const applier = req.body["signEmail"];
  // console.log(req.body.signEmail);

  console.log(applier);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "systemyuntech@gmail.com",
      pass: "mgve yqhw btkx jycf"
    }
  })

  const randomCode = Math.floor(Math.random() * 9000) + 1000;
  console.log(randomCode)
  const mailOptions = {
    from: "TestSystem",
    to: applier,
    subject: "TestSystem驗證碼",
    text: `驗證碼為"${randomCode}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(false)
    } else {
      res.json(randomCode);
    }
  })
})

router.post('/insertPhoto', upload.single("insertPhoto"), (req, res) => {
  res.status(200).send('success')
})

module.exports = router;