const express = require('express')
const router = express.Router()
const cookieParser = require("cookie-parser")
const multer = require('multer');
const { sequelize, userAccounts, fileInfo, jsonFile } = require('../sqlSetting');
const { where, json, AsyncQueueError } = require('sequelize');
const path = require('path')
const fs = require('fs');

router.use(cookieParser())

router.post('/getPdf', multer().none(), (req, res) => {
  console.log("我已經好多天沒有正常睡覺了 希望老闆可以給我好一點的待遇 我從小時後就過得沒有很好 到了國小 也被同學們排擠 老師也都對我不好 上了國中成績又不好 上了不好了高中 也避不了業 大學也考了一個私立的科大 去711上班 跳樓");
  const fileName = req.body.fileName
  const userName = req.cookies.userName
  const pdfPath = path.join(__dirname, "..","user_data", userName, fileName, 'combine.pdf')
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(pdfPath);
}) 

router.post('/getfolder', multer().none(), (req, res) => {
  const userName = req.cookies.userName;
  let fileList = []
  sequelize.sync().then(async () => {
    const files = await jsonFile.findAll({
      where: {
        userAcc: userName
      }
    });

    files.forEach(element => {
      fileList.push(element.jsonName)
    });
    res.json(fileList).status(200)
  })
})

router.post('/getjsons', multer().none(), async (req, res) => {
  console.log(req.body);
  let resultLst = []
  const userName = req.cookies.userName
  const fileName = req.body.fileName
  const fullTest = fs.readFileSync(`./user_data/${userName}/${fileName}/fullTest/fullTest.json`, 'utf-8')
  const studyTest = fs.readFileSync(`./user_data/${userName}/${fileName}/studyTest/studyTest.json`, 'utf-8')
  const technicalTest = fs.readFileSync(`./user_data/${userName}/${fileName}/technicalTest/technicalTest.json`, 'utf-8')
  const fullData = JSON.parse(fullTest)
  const studyData = JSON.parse(studyTest)
  const tecData = JSON.parse(technicalTest)

  fullData.forEach((data) => {
    const birthYear = (Number(data[0]['出生日期'].slice(0, 3)) + 1911).toString()
    const birthMonth = data[0]['出生日期'].slice(3, 5)
    // console.log("birthMonth:");
    // console.log(birthMonth);
    const birthDay = data[0]['出生日期'].slice(5)
    data[0]['出生日期'] = birthYear + "-" + birthMonth + "-" + birthDay
    resultLst.push(data)
  })
  studyData.forEach(element => {
    const birthYear = (Number(element[0]['出生日期'].slice(0, 3)) + 1911).toString()
    const birthMonth = element[0]['出生日期'].slice(3, 5)
    const birthDay = element[0]['出生日期'].slice(5)
    element[0]['出生日期'] = birthYear + "-" + birthMonth + "-" + birthDay
    resultLst.push(element)
  });
  tecData.forEach(element => {
    const birthYear = (Number(element[0]['出生日期'].slice(0, 3)) + 1911).toString()
    const birthMonth = element[0]['出生日期'].slice(3, 5)
    const birthDay = element[0]['出生日期'].slice(5)
    element[0]['出生日期'] = birthYear + "-" + birthMonth + "-" + birthDay
    resultLst.push(element)
  });

  res.cookie("fileName", fileName, {
    httpOnly: false,
    sameSite: "None",
    secure: true
  }).status(200).json(resultLst)

})

router.get('/:userName/:fileName/:imgFile', (req, res) => {
  console.log("123123123");

  const imgFile = path.join(__dirname, `./user_data/${req.params.userName}/${req.params.fileName}/image/${req.params.imgFile}.jpg`)
  res.sendFile(imgFile)
})

module.exports = router;