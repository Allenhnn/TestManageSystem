import type { _CommonType } from "./_CommonType"
export type _NestedType = {
    "pigID": string,
    "confirmStatus": boolean
}
export type _ReloadStudentType = [
    {
        "准考證號碼": string
        "身分證號碼": string
        "中文姓名": string
        "出生日期": string
        "報簡職類": string
        "英文姓名": string
        "檢定區別": string
        "通訊地址": string
        "戶籍地址": string
        "聯絡電話(住宅)": string
        "聯絡電話(手機)": string
        "就讀學校": string
        "就讀科系": string
        "上課別": string
        "年級": string
        "班級": string
        "座號": string
        "身分別": string
        "學制": string
    }
    ,
    _NestedType
]
export type _ReloadStudentTypeList = _ReloadStudentType[];
//  [
//         {
//             "准考證號碼": "5",
//             "身分證號碼": "H126312469",
//             "中文姓名": "卓宸宸",
//             "出生日期": "95830",
//             "報簡職類": "會計人工",
//             "英文姓名": "ZHUO,YU-CHEN",
//             "檢定區別": "全測",
//             "通訊地址": "桃園市中壢區中北",
//             "戶籍地址": "桃園市中壢區中北路",
//             "聯絡電話(住宅)": "034551238",
//             "聯絡電話(手機)": "0953083990",
//             "就讀學校": "中壢家商",
//             "就讀科系": "商業經營科",
//             "上課別": "日間部",
//             "年級": "1",
//             "班級": "19",
//             "座號": "5",
//             "身分別": "身心障礙",
//             "學制": "高級中學"
//         },
//         {
//             "pigID": "A00005",
//             "comfirmStatus": false
//         }
//     ]