const { spawn } = require('child_process');
const express = require('express');
const app = express();
const path = require("path")
const nodemailer = require("nodemailer")
const { sequelize, userAccounts  , fileInfo , jsonFile} = require('./sqlSetting');
const { where, json, AsyncQueueError } = require('sequelize');
const cors = require('cors');
const fs = require('fs');
const  cookieParser =  require("cookie-parser")
const multer = require('multer');

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // 只允許這個來源的前端請求
  credentials : true
}));
app.use(express.json())


app.get("/test" , (req, res) => {
  console.log("test success")
  res.send('success')
})

app.get('/' , async(req,res)=>{
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

// app.get('/autoset' , async(req,res) =>{
//   const createOneAcc =await fetch('http://localhost:3000/createOneAcc')
//   const upload = await fetch('http://localhost:3000/upload')
// })

app.post('/getfolder', multer().none(), (req, res) => {
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

app.post('/getjsons' , multer().none(),async(req ,res)=>{
  let resultLst =[]
  const userName = req.body.userName
  const fileName  = req.body.fileName

  const fullTest = fs.readFileSync(`./user_data/${userName}/${fileName}/fullTest/fullTest.json`, 'utf-8')
  const studyTest = fs.readFileSync(`./user_data/${userName}/${fileName}/studyTest/studyTest.json`, 'utf-8')
  const technicalTest = fs.readFileSync(`./user_data/${userName}/${fileName}/technicalTest/technicalTest.json`, 'utf-8')
  const fullData = JSON.parse(fullTest)
  const studyData = JSON.parse(studyTest)
  const tecData = JSON.parse(technicalTest)
  fullData.forEach((data) =>{
    resultLst.push(data)
  })
  studyData.forEach(element => {
    resultLst.push(element)
  });
  tecData.forEach(element => {
    resultLst.push(element)
  });
  
  res.json(resultLst).status(200)
})

// app.post('/createFolder', multer().none(), async (req, res) => {
//   console.log(req.body);
//   console.log(1231231231231232112321321321323+"piyna")
//   const userName = req.cookies.userName
//   const fileName = req.body.fileName
//   sequelize.sync().then(async () => {
//     const files = await jsonFile.findOne({
//       where: {
//         jsonName: fileName
//       }
//     });
    

//     if (!files) {
//       console.log(1231231231231232112321321321323+"piyna")
//       console.log(files)

//       const folderName = path.join(__dirname, "user_data", userName, fileName)
//       const fullTest = path.join(__dirname, "user_data", userName, fileName, "fullTest")
//       const studyTest = path.join(__dirname, "user_data", userName, fileName, "studyTest")
//       const technicalTest = path.join(__dirname, "user_data", userName, fileName, "technicalTest")
//       const imagePath = path.join(__dirname, "user_data", userName, fileName, "image")

//       await fs.mkdirSync(folderName, { recursive: true });
//       await fs.mkdirSync(fullTest, { recursive: true });
//       await fs.mkdirSync(studyTest, { recursive: true });
//       await fs.mkdirSync(technicalTest, { recursive: true });
//       await fs.mkdirSync(imagePath, { recursive: true });

//       res.cookie("fileName", fileName, {
//         httpOnly: false,
//         sameSite: "None",
//         secure: true
//       }).status(200).send("成功了!!")
//     }else{
//       res.status(400).send("file duplicated")
//     }
//   })
// })
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
    }else{
      res.status(400).send("file duplicated")
    }
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const extName = path.extname(file.originalname)
    const userName = req.cookies.userName
    const filePath = req.cookies.fileName
    let folderPath = ''
    if(extName === ".xlsx"){
      folderPath = `./user_data/${userName}/${filePath}`
    }else if(extName === ".jpg"){
      folderPath = `./user_data/${userName}/${filePath}/image`
    }
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.fields([{ name:'excelFile' }, { name:'photoFile'}]) , async (req, res) => {  
  const userName = req.cookies.userName
  const fileName = req.body.fileName
  const excelFile = req.body.originalName
  const filePath = `./user_data/${userName}/${fileName}/${excelFile}.xlsx`

  const py = await spawn('python', ['process.py', filePath, userName, fileName])
  let outputData = ''
  py.stdout.on('data', (data) => {
    outputData += data.toString('utf-8')
  })

  py.stderr.on('data' , (data) =>{
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

app.post('/signup' , (req,res) =>{
  const applier  = req.body.signEmail;
  // console.log(req.body.signEmail);
  
  console.log(applier);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "systemyuntech@gmail.com",
      pass: "mgve yqhw btkx jycf"
    }
  })

  const randomCode = Math.floor(Math.random()*9000)+1000;
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

app.post("/login" ,async (req, res) =>{
  console.log(req.body)
  const reqAcc = req.body.loginAccount;
  const reqPsd  = req.body.loginPassword;
  sequelize.sync().then(async()=>{
    const targetAcc = await userAccounts.findOne({where:{
      userAcc:reqAcc
      }
    });
    
    console.log(`targetAcc:${targetAcc.userAcc}`);
    console.log(`targetPsd:${targetAcc.userPsd}`)
    if (targetAcc.userPsd === reqPsd){
      res.cookie("userName" , reqAcc ,{
        httpOnly:false,
        sameSite:"None",
        secure :true
      }).status(200).send("success")
      }else{
        res.status(400).send("false")
      }
  })
})

app.post("/createOneAcc" , multer().none(),async(req, res) => {
  const userAccount = req.body.signAccount
  const userPassword = req.body.signPassword
  const newFolderPath = path.join(__dirname , "user_data" , userAccount)
  sequelize.sync().then(() => {
    userAccounts.create({
      userAcc : userAccount,
      userPsd : userPassword
    }).then(()=>{
      fs.mkdirSync(newFolderPath, { recursive: true }); 
      console.log("account already ready")
      res.cookie("userAccount" , userAccount ,{
        httpOnly:false,
        sameSite:"None",
        secure :true
      })   
      res.status(200).send("成功了!!")
    }).catch(err=>{
      if(err.name === "SequelizeUniqueConstraintError"){
        console.log('帳號重複')
        return;
      };
    })
  });
})


app.get("/desTestAcc", async (req, res) => {
  try {
    const accounts = await userAccounts.findAll();
    for (const account of accounts) {
      console.log(`useracc: ${account.userAcc} has been deleted`);
      await account.destroy();  
    }
    res.json({ message: "All accounts deleted" });
  } catch (error) {
    console.error("刪除帳號時發生錯誤:", error);
    res.status(500).json({ error: "刪除失敗" });
  }
});

app.get("/showAllAcc" , async(req,res)=>{
    sequelize.sync().then(async()=>{
      const accounts = await userAccounts.findAll();
      var counter=0 ;
      for (const account of accounts){
        counter++;
        console.log(`userID ${counter}:${account.userID}`)
        console.log(`userAccount ${counter} :${account.userAcc}`);
        console.log(`userPassword ${counter} :${account.userPsd}`);
      }
    })
})

app.get("/seeAllJson" , async(req,res)=>{
  sequelize.sync().then(async()=>{
      const files = await jsonFile.findAll();
      var counter=0 ;
      for (const file of files){
        counter++;
        console.log(` ${counter}:${file.jsonID}`)
        console.log(` ${counter} :${file.jsonName}`);
        console.log(` ${counter} :${file.userAcc}`);
      }
  })
})

// function verify_regular(){
  
// }

app.post("/fillWd" , multer().none() ,async(req,res)=>{
  // const userName = "dexter" ;//req.body['username']
  const userName = req.body.userName
  const chooseFile = req.body.chooseFile
  // const chooseFile = "test-1" ;//req.body['test-1.json]
  // const filePath = path.join(__dirname  , "user_data" , userName , )
  const py = spawn('python' , ['fillWord.py' , userName , chooseFile]);
  let outputData =''
  py.stdout.on('data' , (data)=>{
    outputData += data.toString('utf-8')
  });

  py.stderr.on('data', (data) => {
    console.error("Python error:", data.toString('utf-8'));  
  });

  py.on('close' , ()=>{
    console.log(outputData)
    res.send('success').status(200)
  })
});

app.get("/verifyData", (req, res) => {
  const userName = "dexter";
  const chooseFile = "test-1";
  let badInfoList = []
  fs.readFile(`./user_data/${userName}/${chooseFile}/${chooseFile}.json`, "utf8", (err, loadJsonList) => {
    if (err) {
      console.log(err)
      return;
    }
    const jsonList =JSON.parse(loadJsonList)
    jsonList.forEach((jsonData , idx) => {
      const badInfo = verify_data(jsonData, idx)
      if (badInfo != null){
        badInfoList.push(badInfo)
      }
    });
  })
  // verify_data()
})

// function verify_data(json_data ,idx){
//   const idRegex = /^[A-Z][12]\d{8}$/;
//   const id = json_data["身分證號碼"];
//   let badContent = []
//   if (!idRegex.test(id)) {
//     // console.log("格式錯誤");
//     badContent.push("身分證號碼")
//   }

//   const birthRegex = /^\d{5}$/
//   const birthDay = json_data["出生日期"]  
//   // if (!birthRegex.test(b))
// }

const editUpload = multer()

app.post("/editFile" , editUpload.none() ,(req ,res) =>{
  console.log(req.body);
  testTypeMap = {
    "A" : "fullTest",
    "B" : "studyTest",
    "C" : "technicalTest"
  }
  const status = req.body.status; //req.body
  const userName = req.body.userName; //req.body
  const fileName = req.body.fileName; //req.body
  const pigID = req.body.pigID;  //req.body
  let testTypeCode = pigID.slice(0,1)
  let testType = testTypeMap[pigID.slice(0,1)]
  if (status ===  "insert"){
    testTypeCode = req.body.insertType
    testType = testTypeMap[testTypeCode]
  }
  // const editIDX = Number(pigID.slice(1))-1
  fs.readFile(`./user_data/${userName}/${fileName}/${testType}/${testType}.json` , 'utf8' , async(err , jsonList)=>{
    if (err){
      console.error( err)
    }
    loadJsonList = JSON.parse(jsonList)
    switch (status){
      case "edit" : 
        await editJson()
        res.send("done").status(200)
        break;
      case "insert" : 
        await insertJson()
        res.send("done").status(200)
        break
      case "delete" :
        await deleteJson()
        res.send("done").status(200)
        break;
    };
    
    function editJson(){
      const editIDX = Number(pigID.slice(1))-1
      const transferType  = req.body.transferType
      const inserFile = [{ "准考證號碼": "7", "身分證號碼": "F203568912", "中文姓名": "王怡婷", "出生日期": "95072", "報簡職類": "行政助理", "英文姓名": "WANG,YI-TING", "檢定區別": "全測", "通訊地址": "新北市板橋區文化路二段", "戶籍地址": "新北市新莊區幸福街", "聯絡電話(住宅)": "0229634456", "聯絡電話(手機)": "0987654321", "就讀學校": "板橋高商", "就讀科系": "資料處理科", "上課別": "日間部", "年級": "2", "班級": "5", "座號": "7", "身分別": "無", "學制": "高級中學" }, { "pigID": "A00004", "comfirmStatus": false }]
      
      if (transferType === testTypeCode){
        loadJsonList[editIDX] = inserFile
      }else {
        transferJson = loadJsonList.splice(editIDX,1)[0]
        loadJsonList = checkID(loadJsonList,testTypeCode)
        fs.readFile(`./user_data/${userName}/${fileName}/${testTypeMap[transferType]}/${testTypeMap[transferType]}.json` , "utf-8" , (err , transferLst)=>{
          loadTransferLst = JSON.parse(transferLst)
          loadTransferLst.push(transferJson)
          loadTransferLst = checkID(loadTransferLst , transferType)
          saveChange(loadTransferLst , testTypeMap[transferType])
        })
      }
      saveChange(loadJsonList , testType)
    }

    function insertJson(){
      const insertFile =JSON.parse( req.body.insertFile)
      loadJsonList.push(insertFile)
      checkID(loadJsonList , testTypeCode)
      saveChange(loadJsonList , testType)
    }

    function deleteJson(){
      const editIDX = Number(pigID.slice(1))-1
      loadJsonList.splice(editIDX,1)
      checkID(loadJsonList , testTypeCode)
      saveChange(loadJsonList, testType)
    }

    function checkID(lst , type){
      lst.forEach((jsons , idx) => {
        jsons[1]["pigID"] = type + String(idx + 1).padStart(5, '0');
      });
      return lst
    }

    function saveChange(data , type){
      fs.writeFile(`./user_data/${userName}/${fileName}/${type}/${type}.json`  , JSON.stringify(data, null, 2)  , (err) =>{
        if (err){
          console.error(err);
        }else{
          console.log("file write success")
        }
      })
    }
  });
})

app.post('/getPdf' ,multer().none(), (req , res)=>{
  const fileName = req.body.fileName
  const userName = req.body.userName
  const pdfPath = path.join(__dirname , "user_data" , userName , fileName , 'combine.pdf')
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(pdfPath);
})

app.listen(3000 , ()=>{
  console.log("server is running"); 
})

