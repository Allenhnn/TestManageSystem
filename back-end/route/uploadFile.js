const express = require('express');
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(fill.originalName);
    const extName = path.extname(file.originalname)
    const userName = req.cookies.userName
    const filePath = req.cookies.fileName
    let folderPath = ''
    if (extName === ".xlsx") {
      folderPath = `./user_data/${userName}/${filePath}`
    } else if (extName === ".jpg") {
      folderPath = `./user_data/${userName}/${filePath}/image`
    } else if (extName === ".docx") {
      folderPath = `./user_data/${userName}/${filePath}`
    }
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname)
    let uploadFileName = ""
    if (extName === ".xlsx") {
      uploadFileName = req.cookies.fileName + ".xlsx"
    } else if (extName === ".jpg") {
      uploadFileName = file.originalname
    } else {
      uploadFileName = "5.報名表正面.docx"
    }
    cb(null, uploadFileName)
  }
})

const upload = multer({ storage: storage })