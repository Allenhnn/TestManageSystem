const express = require('express')
const router = express.Router()
const cookieParser = require("cookie-parser")
const multer = require('multer');
const fs = require('fs');
const nodemailer = require("nodemailer")

router.use(cookieParser())

router.post("/editFile", (req, res) => {
  console.log(req.body);

  // console.log(req.body["status"])
  testTypeMap = {
    "A": "fullTest",
    "B": "studyTest",
    "C": "technicalTest"
  }
  let testTypeCode = ''
  let testType = ''
  let pigID = ''
  const status = req.body["status"]; //req.body
  const userName = req.cookies.userName; //req.body
  const fileName = req.body["filename"]; //req.body
  // const testTypeCode = pigID.slice(0, 1)
  // const testType = testTypeMap[testTypeCode]
  if (status === "edit") {
    const insertFile = req.body["insertFile"]
    pigID = insertFile[1]["pigID"]
    testTypeCode = pigID.slice(0, 1)
    testType = testTypeMap[testTypeCode]
  }
  if (status === "insert") {
    testTypeCode = req.body["insertType"]
    testType = testTypeMap[testTypeCode]
  }
  if (status === "delete") {
    pigID = req.body["pigID"]
    testTypeCode = pigID.slice(0, 1)
    testType = testTypeMap[testTypeCode]
  }
  // const editIDX = Number(pigID.slice(1))-1
  fs.readFile(`./user_data/${userName}/${fileName}/${testType}/${testType}.json`, 'utf8', async (err, jsonList) => {
    if (err) {
      console.error(err)
    }
    loadJsonList = JSON.parse(jsonList)
    switch (status) {
      case "edit":
        try {
          await editJson()
          res.send("done").status(200)
        } catch (err) {
          console.log(err)
          res.status(400).send('fail')
        }
        break;
      case "insert":
        try {
          await insertJson()
          res.send("done").status(200)
        } catch (err) {
          console.log(err)
          res.status(400).send("fail")
        }
        break;
      case "delete":
        try {
          await deleteJson()
          console.log(loadJsonList)
          res.send("done").status(200)
        } catch (err) {
          res.status(400).send("fail")
        }
        break;

    };

    function editJson() {
      const transferType = req.body["transferType"]
      const insertFile = req.body["insertFile"]
      const editIDX = Number(pigID.slice(1)) - 1
      const birthYear = String(Number(insertFile[0]['出生日期'].replaceAll("-", "").slice(0, 4)) - 1911).padStart(3, "0")
      const birthDay = insertFile[0]['出生日期'].replaceAll("-", "").slice(4)
      insertFile[0]['出生日期'] = birthYear + birthDay


      if (transferType === testTypeCode) {
        loadJsonList[editIDX] = insertFile
        // console.log(loadJsonList);

      } else {
        transferJson = loadJsonList.splice(editIDX, 1)[0]
        loadJsonList = checkID(loadJsonList, testTypeCode)
        fs.readFile(`./user_data/${userName}/${fileName}/${testTypeMap[transferType]}/${testTypeMap[transferType]}.json`, "utf-8", (err, transferLst) => {
          loadTransferLst = JSON.parse(transferLst)
          loadTransferLst.push(transferJson)
          loadTransferLst = checkID(loadTransferLst, transferType)
          saveChange(loadTransferLst, testTypeMap[transferType])
        })
      }
      saveChange(loadJsonList, testType)
    }

    function insertJson() {
      console.log(req.body["insertFile"]);

      const insertFile = req.body["insertFile"]
      let insertFileLst = []
      const birthYear = String(Number(insertFile["出生日期"].replaceAll("-", "").slice(0, 4)) - 1911).padStart(3, "0")
      const birthDay = insertFile['出生日期'].replaceAll("-", "").slice(4)
      const initInsertFile = { "pigID": "", "confirmStatus": false }
      insertFile['出生日期'] = birthYear + birthDay
      insertFileLst.push(insertFile)
      insertFileLst.push(initInsertFile)
      loadJsonList.push(insertFileLst)
      checkID(loadJsonList, testTypeCode)
      saveChange(loadJsonList, testType)
    }

    function deleteJson() {
      const editIDX = Number(pigID.slice(1)) - 1
      loadJsonList.splice(editIDX, 1)
      checkID(loadJsonList, testTypeCode)
      saveChange(loadJsonList, testType)
    }

    function checkID(lst, type) {
      lst.forEach((jsons, idx) => {
        jsons[1]["pigID"] = type + String(idx + 1).padStart(5, '0');
      });
      return lst
    }

    function saveChange(data, type) {
      fs.writeFile(`./user_data/${userName}/${fileName}/${type}/${type}.json`, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("file write success")
        }
      })
    }
  })
})

router.post('/confirm', multer().none(), (req, res) => {
  testTypeMap = {
    "A": "fullTest",
    "B": "studyTest",
    "C": "technicalTest"
  }
  const userName = req.cookies.userName
  const fileName = req.body.fileName
  const pigID = req.body.pigID
  // const insertFile = req.body.insertFile
  let testTypeCode = pigID.slice(0, 1)
  const testType = testTypeMap[testTypeCode]

  console.log("pigIDpigIDpigIDpigIDpigIDpigID");
  console.log(pigID);
  console.log(testTypeCode);
  console.log(testType);

  fs.readFile(`./user_data/${userName}/${fileName}/${testType}/${testType}.json`, 'utf-8', (err, loadData) => {
    const editIDX = Number(pigID.slice(1)) - 1
    jsondatas = JSON.parse(loadData)
    jsondatas[editIDX][1]["confirmStatus"] = true
    fs.writeFile(`./user_data/${userName}/${fileName}/${testType}/${testType}.json`, JSON.stringify(jsondatas, null, 2), (err) => {
      if (err) {
        res.status(400).send("fail")
        console.error("寫入 JSON 檔失敗:", err);
      } else {
        res.status(200).send("success")
        console.log("寫入 JSON 檔成功");
      }
    })
  })
})

router.post('/confirmAll', multer().none(), (req, res) => {
  const userName = req.cookies.userName
  const fileName = req.body.fileName

  const fullTest = fs.readFileSync(`./user_data/${userName}/${fileName}/fullTest/fullTest.json`)
  const studyTest = fs.readFileSync(`./user_data/${userName}/${fileName}/studyTest/studyTest.json`)
  const technicalTest = fs.readFileSync(`./user_data/${userName}/${fileName}/technicalTest/technicalTest.json`)

  const fullTestJsons = writeList(JSON.parse(fullTest))
  fs.writeFileSync(`./user_data/${userName}/${fileName}/fullTest/fullTest.json`, JSON.stringify(fullTestJsons, null, 2))

  const studyTestJsons = writeList(JSON.parse(studyTest))
  fs.writeFileSync(`./user_data/${userName}/${fileName}/studyTest/studyTest.json`, JSON.stringify(studyTestJsons, null, 2))

  const technicalTestJsons = writeList(JSON.parse(technicalTest))
  fs.writeFileSync(`./user_data/${userName}/${fileName}/technicalTest/technicalTest.json`, JSON.stringify(technicalTestJsons, null, 2))

  function writeList(jsons) {
    jsons.forEach(json => {
      json[1]["confirmStatus"] = true
    });
    return jsons
  }

  res.status(200).send('success')
})

module.exports = router;