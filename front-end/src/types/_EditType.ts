import type { _CommonType } from "./_CommonType";
type _NestedType ={
    "pigID":string,
    "confirmStatus":string
}
export type _EditType = {
    "status": string,
    "userName": string,
    "filename": string,
    // "pigID": string,
    "transferType": string,
    "insertFile": [_CommonType,_NestedType], 
    
} 