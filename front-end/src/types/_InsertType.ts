import type { _CommonType } from "./_CommonType"
export type _InsertType = {
    "status": string , 
    "userName" : string , 
    "filename" : string , 
    "insertType": string,
    "insertFile":_CommonType
}

// {
//     "status": "insert" , 
//     "userName" : "" , 
//     "filename" : "" , 
//     "insertType": "",
//     "insertFile":{
//         "准考證號碼"  :"",
//         "身分證號碼" : ""
//         ...
//     }
// }