const express = require('express');
const router = express.Router()
const { sequelize, userAccounts, fileInfo, jsonFile } = require('../sqlSetting');
const { where, json, AsyncQueueError } = require('sequelize');
const multer = require('multer');
const cookieParser = require("cookie-parser")

router.use(cookieParser())


router.post("/login", async (req, res) => {
//   console.log(req.body)
  const reqAcc = req.body["loginAccount"];
  const reqPsd = req.body["loginPassword"];
  
  sequelize.sync().then(async () => {
    const targetAcc = await userAccounts.findOne({
      where: {
        userAcc: reqAcc
      }
    })
    if (!targetAcc) {
      console.log(`no such account: ${reqAcc}`);
      return res.status(400).send("false");
    }
    // console.log(`targetAcc:${targetAcc.userAcc}`);
    // console.log(`targetPsd:${targetAcc.userPsd}`)
    if (targetAcc.userPsd === reqPsd) {
      res.cookie("userName", reqAcc, {
        httpOnly: false,
        sameSite: "None",
        secure: true
      }).status(200).send("success")
    } else {
      res.status(400).send("false")
    }
  })
})

router.get("/showAllAcc", async (req, res) => {
  sequelize.sync().then(async () => {
    const accounts = await userAccounts.findAll();
    var counter = 0;
    for (const account of accounts) {
      counter++;
      console.log(`userID ${counter}:${account.userID}`)
      console.log(`userAccount ${counter} :${account.userAcc}`);
      console.log(`userPassword ${counter} :${account.userPsd}`);
    }
  })
})

router.get("/desTestAcc", async (req, res) => {
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

router.post('/logout' , (req,res) =>{
  const getcoo = req.cookies;
  console.log(getcoo)
  for (let cookieName in getcoo) {
    res.clearCookie(cookieName); // 預設 path="/"
  }
  res.status(200).send('success')
})


module.exports = router;