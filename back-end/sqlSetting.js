const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite.db' // ✅ 自動建立 sqlite 檔案
});

// 使用者
const userAccounts = sequelize.define('userAccounts',{
  userID:{
    primaryKey :true,
    autoIncrement :true,
    type: DataTypes.INTEGER,
  },
  userAcc:{
    type: DataTypes.STRING,
    unique : true, 
    allowNull:false
  },
  userPsd:{
    type:DataTypes.STRING,
    unique : true, 
    allowNull:false
  }
});

// excel檔案
const fileInfo = sequelize.define('fileInfo' , {
  fileID:{
    primaryKey :true , 
    autoIncrement :true,
    type:DataTypes.INTEGER
  },
  fileOwner:{
    type:DataTypes.STRING,
    unique : true, 
    allowNull:false
  },
  fileType:{
    type:DataTypes.ENUM('Excel' , 'Word'),
    unique : true,
    allowNull:false
  },
  fileName:{
    type:DataTypes.STRING,
    unique : true,
    allowNull:false
  }
  
})

// json檔案(讀取excel 檔案內容)
const jsonFile = sequelize.define('jsonFile' , {
  jsonID:{
    primaryKey:true, 
    autoIncrement : true,
    type:DataTypes.INTEGER
  },
  jsonName:{
    type:DataTypes.STRING,
    unique:false,
    allowNull:false
  },
  userAcc:{
    type: DataTypes.STRING
  }
})

module.exports ={
    sequelize , userAccounts , fileInfo , jsonFile
}

