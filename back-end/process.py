import pandas as pd 
import numpy as np
import sys
import json

userName = ""
cFileName = ""

sys.stdout.reconfigure(encoding='utf-8')  # ✅ 保證輸出為 UTF-8（避免 Windows 預設 gbk/cp950）

def getDataTable(filePath):
    fullTestTable = pd.read_excel(filePath, sheet_name='套印用資料-全測')
    dataJsonLst = getData(filePath,fullTestTable , "Data-全測" , "A")
    with open(f"./user_data/{userName}/{cFileName}/fullTest/fullTest.json" , "w" , encoding="utf-8") as jason_f:
        json.dump(dataJsonLst , jason_f , ensure_ascii=False , indent= 4)

    studyTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免學')
    dataJsonLst = getData(filePath,studyTestTable , "Data-免學" , "B")
    with open(f"./user_data/{userName}/{cFileName}/studyTest/studyTest.json" , "w" , encoding="utf-8") as jason_f:
        json.dump(dataJsonLst , jason_f , ensure_ascii=False , indent= 4)

    technicalTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免術')
    dataJsonLst = getData(filePath,technicalTestTable, "Data-免學" , "C")
    with open(f"./user_data/{userName}/{cFileName}/technicalTest/technicalTest.json" , "w" , encoding="utf-8") as jason_f:
        json.dump(dataJsonLst , jason_f , ensure_ascii=False , indent= 4)

    
def getMajorCode(filePath):
    dataframe= pd.read_excel(filePath,sheet_name='代號',usecols=[0])
    majorLst = [data[0] for data in dataframe.values]
    return majorLst

def testTypeCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號"  , usecols=[15])
    testTypeLst = [data[0] for data in dataframe.values]
    return testTypeLst

def classCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name= "代號" , usecols= [4])
    classCodeLst = [data[0] for data in dataframe.values]
    return classCodeLst

def getSchCode(filePath):
    dataframe = pd.read_excel(filePath,sheet_name="代號" , usecols=[8,9,10])
    SchCodeLst = [data[1] for data in dataframe.values]
    return SchCodeLst

def getStudyType(filePath):
    dataframe = pd.read_excel(filePath ,sheet_name="代號" , usecols=[18])
    StudyType = [data[0] for data in dataframe.values]
    return StudyType

def getSpecificCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號" , usecols=[21])
    SpecificLst = [ data[0] for data in dataframe.values]
    return SpecificLst

def getSchoolCode( filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號" , usecols=[12])
    schoolTypeLst = [data[0] for data in dataframe.values]
    return schoolTypeLst

def getData(filePath,dataFrame , frameType , pigID):
    dataRows = dataFrame.shape[0]
    dataJsonLst = []
    idDataframe = pd.read_excel(filePath , sheet_name= frameType , skiprows=2)
    for i in range(dataRows):
        testNumber = idDataframe.loc[i , "流水號"] 
        identification = dataFrame.loc[i , '身分證號碼']
        chName = dataFrame.loc[i, '中文姓名']
        birthYear = dataFrame.loc[i,'出生年']
        birthMounth = dataFrame.loc[i,'出生月']
        birthDay = dataFrame.loc[i, '出生日']
        testTypeLst = testTypeCode(filePath)    
        testTypeID = int(dataFrame.loc[i,"測驗類別"])
        testType = testTypeLst[testTypeID-1]
        engName = str(dataFrame.loc[i,"英文姓名"])
        testSubject = testType[:-2]
        testType  = testType[-2:]
        callAdr = str(dataFrame.loc[i,"通訊地址"])
        liveAdr = str(dataFrame.loc[i,"戶籍地址"])
        teleArea  = str(dataFrame.loc[i , "電話(區域號碼)"])
        teleNum = str(dataFrame.loc[i,"電話"])
        cellNum = str(dataFrame.loc[i,"行動電話"])
        schCode = str(dataFrame.loc[i,"學校"])
        SchCodeLst = getSchCode(filePath)
        stdSch = SchCodeLst[int(schCode)-1]
        majorCodeLst = getMajorCode(filePath)
        majorCode = int(dataFrame.loc[i,"科系"]) 
        major = majorCodeLst[majorCode-1]
        StudyTypeLst = getStudyType(filePath)
        studyCode = int(dataFrame.loc[i, "學制"])
        studyType  = StudyTypeLst[studyCode-1]
        year = str(dataFrame.loc[i, "年級"])
        sclass = str(dataFrame.loc[i,"班級"])
        number  = str(dataFrame.loc[i,"座號"])
        specificLst = getSpecificCode(filePath)
        specificCode = int(dataFrame.loc[i,"特定對象"])
        specificType = "無"
        specificType = specificLst[specificCode-1 ]if specificCode!=0 else "無"
        schoolTypeCode = dataFrame.loc[i,"學制"]
        schoolTypeLst = getSchoolCode(filePath)
        schoolType = schoolTypeLst[schoolTypeCode]
        datajson = [{    
            '准考證號碼':str(testNumber),
            '身分證號碼':str(identification),
            '中文姓名':str(chName),
            '出生日期':f"{int(birthYear):03d}{int(birthMounth):02d}{int(birthDay):02d}",  
            '報簡職類':str(testSubject),
            '英文姓名':str(engName),
            '檢定區別':str(testType),
            '通訊地址':str(callAdr),
            '戶籍地址':str(liveAdr),
            '聯絡電話(住宅)':"0" + str(teleArea) + str(teleNum),
            '聯絡電話(手機)':"0"+cellNum,
            '就讀學校':str(stdSch),
            '就讀科系':str(major),
            '上課別':str(studyType),
            '年級':str(year),
            '班級':str(sclass),
            '座號':str(number),
            '身分別':str(specificType),
            '學制':str(schoolType), 
        },
        {
            'pigID' : f"{pigID}{i+1:05d}",
            "confirmStatus" : False
        }]
        for item in datajson[0]:
            # print(type(datajson[0][item]))
            if  "nan" ==datajson[0][item]:
                print("enter")
                datajson[0][item] =""
        dataJsonLst.append(datajson)
    return dataJsonLst
    



if __name__ == "__main__":
    filePath = sys.argv[1]
    userName  = sys.argv[2]
    cFileName = sys.argv[3]
    getDataTable(filePath)

# getDataTable("./back-end/convert_content/1.中壢高商(14901).xlsx")




