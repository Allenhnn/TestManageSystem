const { spawn } = require('child_process');
const express = require('express');
const app = express();
const path = require("path")
const nodemailer = require("nodemailer")
const { sequelize, userAccounts, fileInfo, jsonFile } = require('./sqlSetting');
const { where, json, AsyncQueueError } = require('sequelize');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require("cookie-parser")
const multer = require('multer');

// route import
const uploadRounter = require('./routes/upload_file')
const loginRouter = require('./routes/login')
const getInfoRouter = require('./routes/getinfos')
const registInfo  = require('./routes/regist_info')
// other module use
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // 只允許這個來源的前端請求
  credentials: true
}));
app.use(express.json())

//route use
app.use('/' , uploadRounter);
app.use('/', loginRouter);
app.use('/' , getInfoRouter);
app.use('/' , registInfo);

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log(`visitor:${ip}`)
});

app.get('/cleanAllData', (req, res) => {
  fs.unlink('./sqlite.db', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('刪除資料庫失敗');
      return;
    }

    fs.rm('./user_data/dexter', { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('刪除資料夾失敗');
        return;
      }

      res.send('刪除成功');
    });
  });
});

app.post('/createFolder', multer().none(), async (req, res) => {
  const userName = req.cookies.userName
  const fileName = req.body.fileName
  sequelize.sync().then(async () => {
    const files = await jsonFile.findOne({
      where: {
        jsonName: fileName
      }
    });

    if (!files) {
      console.log(files)

      const folderName = path.join(__dirname, "user_data", userName, fileName)
      const fullTest = path.join(__dirname, "user_data", userName, fileName, "fullTest")
      const studyTest = path.join(__dirname, "user_data", userName, fileName, "studyTest")
      const technicalTest = path.join(__dirname, "user_data", userName, fileName, "technicalTest")
      const imagePath = path.join(__dirname, "user_data", userName, fileName, "image")

      await fs.mkdirSync(folderName, { recursive: true });
      await fs.mkdirSync(fullTest, { recursive: true });
      await fs.mkdirSync(studyTest, { recursive: true });
      await fs.mkdirSync(technicalTest, { recursive: true });
      await fs.mkdirSync(imagePath, { recursive: true });

      res.cookie("fileName", fileName, {
        httpOnly: false,
        sameSite: "None",
        secure: true
      }).status(200).send("成功了!!")
    } else {
      res.status(400).send("file duplicated")
    }
  })
})

app.post("/createOneAcc", multer().none(), async (req, res) => {
  console.log(req.body);

  const userAccount = req.body["signAccount"]
  const userPassword = req.body["signPassword"]
  const newFolderPath = path.join(__dirname, "user_data", userAccount)
  sequelize.sync().then(() => {
    userAccounts.create({
      userAcc: userAccount,
      userPsd: userPassword
    }).then(() => {
      fs.mkdirSync(newFolderPath, { recursive: true });
      console.log("account already ready")
      res.cookie("userName", userAccount, {
        httpOnly: false,
        sameSite: "None",
        secure: true
      })
      res.status(200).send("成功了!!")
    }).catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        console.log('帳號重複')
        res.status(400).send("duplicated")
        return;
      };
    })
  });
})

app.post("/fillWd", multer().none(), async (req, res) => {
  // const userName = "dexter" ;//req.body['username']
  console.log(req.body)
  const userName = req.cookies.userName
  const chooseFile = req.body.chooseFile
  // const chooseFile = "test-1" ;//req.body['test-1.json]
  // const filePath = path.join(__dirname  , "user_data" , userName , )
  const py = spawn('python3', ['fillWord.py', userName, chooseFile]);
  let outputData = ''
  py.stdout.on('data', (data) => {
    outputData += data.toString('utf-8')
  });

  py.stderr.on('data', (data) => {
    console.error("Python error:", data.toString('utf-8'));
  });

  py.on('close', () => {
    console.log(outputData)
    res.status(200).send('success')
  })
});

app.listen(3000, () => {
  console.log("server is running");
})