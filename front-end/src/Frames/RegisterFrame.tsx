import { use, useContext, useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faEye, faFile, faFolder, faGear, faImage, faMagnifyingGlass, faPaperPlane, faPen, faPhotoFilm, faPhotoVideo, faPrint, faRecycle, faRepeat, faTableList, faTrash, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import TableSwiper from "../component/TableSwiper.tsx";

import DataTable, { type ExportDataType } from "../component/DataTable.tsx";
import Loading from "../component/Loading.tsx";
import DataTableContainer from "./DataTableContainer.tsx";
import ViewStudentContainer from "../component/ViewStudentContainer.tsx";
import EditViewStudentContainer from "../component/EditViewStudentContainer.tsx";
import SearchCode from "../component/SearchCode.tsx";

// context
import { DeclareContextType } from "../types/DeclareContextType.tsx";


// type
import type { _InsertType } from "../types/_InsertType.ts";
import type { _EditType } from "../types/_EditType.ts";
import type { _CommonType } from "../types/_CommonType.ts";

// json
import testPigId from "../json/testPigID.json"
import userUploadFile from "../json/userUploadFile.json";
import userUploadTestFile from "../json/userUploadTestFile.json"


type selectType = {
    value: string,
    label: string
}

const options_type: selectType[] = [
    { value: 'A', label: '全冊' },
    { value: 'B', label: '免學' },
    { value: 'C', label: '免術' },
]

const options_identity: selectType[] = [
    { value: "原住民", label: "原住民" },
    { value: "身心障礙", label: "身心障礙" },
    { value: "低收入戶", label: "低收入戶" },
    { value: "大陸學位生", label: "大陸學位生" },
    { value: "大陸地區人民", label: "大陸地區人民" },
    { value: "外籍人士", label: "外籍人士" },
    { value: "探親就學", label: "探親就學" },
]

type uploadType = {
    "status": boolean,
    "fileName": string | undefined,
    "userInputName": string,
    "uploadPhotoName": string
}
const RegisterFrame = () => {
    // const formData = new FormData();


    const [insertPhotoName, setInsertPhotoName] = useState({ "name": "", "status": false });

    const [loadingState, setLoadingState] = useState(true);

    const [cookie, setCookie] = useState(false);


    // const swiper = useSwiper();
    const [currentFolderName, setCurrentFolderName] = useState("");
    const [editFrameState, setEditFrameState] = useState(0);
    const [viewFrameState, setViewFrameState] = useState(0);
    const [fillInIndex, setFillInIndex] = useState(0);
    const [fillInFrame, setFillInFrame] = useState(false);

    const [template, setTemplate] = useState(false);
    const [penEdit, setpenEdit] = useState(false);
    const [progressionValue, setProgressionValue] = useState(0);
    const [carouselItemDone, setCarouselItemDone] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

    const [modalShow, setModalShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [tempData, setTempData] = useState([]);

    // alert frame
    const [nonFillout, setNonFillout] = useState(0);
    const [repeatAlert, setRepeatAlert] = useState(0);
    const [repeatText, setRepeatText] = useState("您已經輸入 / 上傳資料，確定要退出嗎？");
    const [doubleCheck, setDoubleCheck] = useState(0);
    const [editAlertFrame, setEditAlertFrame] = useState(0);
    const [sucessFrame, setSucessFrame] = useState(0);
    const [alertFrameShow0, setAlertFrameShow0] = useState(0);
    const [alertFrameShow1, setAlertFrameShow1] = useState(0);
    const [radioChecked, setRadioChecked] = useState(0);
    const [confirmAll, setConfirmAll] = useState(0);


    // success & error
    const [notifyFrame, setNotifyFrame] = useState(0);

    // info
    const [uploadStatus, setUploadStatus] = useState<uploadType>({ "status": false, "fileName": "", "userInputName": "", "uploadPhotoName": "" });

    const [alertText, setAlertText] = useState("您有欄位尚未填寫完畢");
    const [handleFetch, setHandleFetch] = useState(false);



    // useRef 


    const triggerExportRef = useRef<ExportDataType | null>(null);
    // const loadingRef = useRef<LoadingType | null>(null);
    const uploadFileNameRef = useRef<HTMLInputElement>(null);
    const uploadFileRef = useRef<HTMLInputElement>(null);
    const uploadPhotoRef = useRef<HTMLInputElement>(null);
    const pendingRef = useRef<HTMLInputElement>(null); // 編輯的input 
    const insertPhotoRef = useRef<HTMLInputElement>(null); // insert的input 
    const wordFileRef = useRef<HTMLInputElement>(null);
    const radioRef = useRef<HTMLInputElement[]>([]);


    useEffect(() => {


        handleLoading();

        fetch("cookie/api", {
            credentials: "include"
        })
            .then((res) => { setCookie(true) })



        // handleRows()

    }, [])
    const handleContext = useContext(DeclareContextType);

    const [tempPigID, setTempPigID] = useState<{ pigID: string, index: number }>({ "pigID": "", "index": 0 });
    const [pigID, setPigID] = useState("");
    const deleteEditData = (index: number, arg: string) => {
        console.log(arg);

        if (index == 0) {
            // 1 save & asking
            setPigID(arg);
            setDoubleCheck(1);
        }
        else {
            // 2 submit
            console.log(10000000);
            setDoubleCheck(0);
            submitDeleteEditData(pigID, currentFolderName);

        }
    }
    const submitDeleteEditData = async (arg: string, fileName: string) => {

        setLoadingState(false);
        const URL: string = "http://localhost:3000/editFile";
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    "status": "delete",
                    "pigID": arg,
                    "fileName": fileName
                })
            })

            if (!res.ok) throw new Error("500 server error");

            // console.log("成功", data)
            setLoadingState(true);

        }
        catch (err) {
            console.error("123", err);
            setLoadingState(true);
            setNonFillout(1);
            setAlertText("刪除資料部分發生錯誤 請再試一次");
        }
    }
    const submitInsertData = () => {
        // formData.append()
        // const insertFile = insertData?.insertFile;
        const formData = new FormData();
        const insertPhoto = insertPhotoRef.current?.files?.[0];
        // Array.from(insertPhoto).forEach((ele, index) => {
        //     formData.append("user_file", ele);
        // })
        insertPhoto ? formData.append("insertPhoto", insertPhoto) : "";

        const isAllFieldsFilled = Object.values(insertData.insertFile).every(value => value.trim() !== "");
        if (insertPhotoRef.current != null) {

            if (!isAllFieldsFilled) {
                // alert("請確保所有欄位都已填寫！");

                setNonFillout(1);
                setAlertText("請確保所有欄位都已填寫！");
                return;
            }
            else {
                try {
                    console.log("123213",insertData);
                    
                    fetch("http://localhost:3000/editFile", {

                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(insertData)
                    })
                        .then(res => setHandleFetch(handleFetch ? false : true))
                        .then()
                    // console.log(3)

                }
                catch (err) {
                    console.warn("errorrrr");

                }

                // -------------------------------------
                try {
                    fetch("http://localhost:3000/insertPhoto", {
                        headers: new Headers({
                            "Content-Type": "application/json"
                        }),
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(insertData)
                    })
                        .then(res => setHandleFetch(handleFetch ? false : true))
                    console.log(3);

                }
                catch (err) {
                    console.warn("errorrrr");

                }

            }


        }
        // ----------------------
        // if

        // insertFile.forEach((item, index) => {
        //     console.log(`第 ${index + 1} 筆 insertFile:`);
        //     console.log(item);
        //     if (!Array.isArray(insertFile)) {
        //         console.log("insertFile 不存在或不是陣列");
        //         return;
        //     }

        //     const hasEmptyField = insertFile.some((item) => {
        //         return Object.entries(item).some(([key, value]) => {
        //             return key !== "pigID" && key !== "confirmStatus" && value === "";
        //         });
        //     });

        //     if (hasEmptyField) {
        //         setNonFillout(1);
        //         setAlertText("您尚有欄位未填寫完畢");
        //         return;
        //     }
        //     console.log("12312312312312312321321312");

        //     fetch("http://localhost:3000/upload", {
        //         // headers: new Headers({

        //         // })
        //         method: "POST",
        //         credentials: "include",
        //         body: JSON.stringify(EditViewData)
        //     })
        //         .then(res => setSucessFrame(1))
        // });

    }

    const submitConfirmAll = () => {
        const folderName = currentFolderName;
        setConfirmAll(0);

        fetch("http://localhost:3000/confirmAll", {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ "fileName": folderName })
        })
            .then((res) => setHandleFetch(handleFetch ? false : true))
        // .then((res)=>res.json())
        // .then(req => setTempData(req))

        radioRef.current[tempPigID.index].checked = true;



    }
    
    const submitEditData = () => {
        // const formData = new FormData();
        const insertFile = EditViewData?.insertFile;
        // const transferValue = 
        let transferText = ""
        switch (EditViewData.insertFile[0]["檢定區別"]) {
            case "全測":
                transferText = "A"
                break;
            case "免學":
                transferText = "B"
                break;
            case "免術":
                transferText = "C"
                break;
            default:
                console.warn("didnt get value");

                break;

        }

        const uploadData: any = {
            ...EditViewData,
            filename: currentFolderName,
            transferType: transferText,
            insertFile: [...EditViewData.insertFile]
        }

        setEditViewData(uploadData)

        if (Array.isArray(insertFile)) {
            const hasEmptyField = insertFile.some((item) => {
                return Object.entries(item).some(([key, value]) => {
                    return key !== "pigID" && key !== "confirmStatus" && value === "";
                });
            });

            if (hasEmptyField) {
                setNonFillout(1);
                setAlertText("您尚有欄位未填寫完畢");
                return;
            }


            fetch("http://localhost:3000/editFile", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uploadData)
            }).then(res => setSucessFrame(1));
        }
    };


    const confirmSubmit = () => {
        setRadioChecked(0);
        const formData = new FormData();
        // formData.append("")
        formData.append("fileName", currentFolderName);
        formData.append("pigID", tempPigID.pigID);

        fetch("http://localhost:3000/confirm", {
            credentials: "include",
            method: "POST",
            body: formData
        })
            .then((res) => setHandleFetch(handleFetch ? false : true))
        // .then((res)=>res.json())
        // .then(req => setTempData(req))

        radioRef.current[tempPigID.index].checked = true;

    }

    // const submitEditData = () => {
    //     console.log("data-----", EditViewData);
    //     Object.entries(EditViewData).forEach((key, value) => {
    //         console.log(key, value);
    //     })
    // }
    // table 細項切換//
    const [insertData, setInsertData] = useState<_InsertType>({
        "status": "insert",
        "userName": "",
        "filename": "",
        "insertType": "A",
        "insertFile": {
            "准考證號碼": "",
            "身分證號碼": "",
            "中文姓名": "",
            "出生日期": "",
            "報簡職類": "",
            "英文姓名": "",
            "檢定區別": "",
            "通訊地址": "",
            "戶籍地址": "",
            "聯絡電話(住宅)": "",
            "聯絡電話(手機)": "",
            "就讀學校": "",
            "就讀科系": "",
            "上課別": "",
            "年級": "",
            "班級": "",
            "座號": "",
            "身分別": "",
            "學制": ""
        }
    })
    const [EditViewData, setEditViewData] = useState<_EditType>({

        "status": "edit",
        "userName": "",
        "filename": "",
        "transferType": "",
        "insertFile": [{
            "准考證號碼": "6",
            "身分證號碼": "H11111111",
            "中文姓名": "allen",
            "出生日期": "941314",
            "報簡職類": "視覺",
            "英文姓名": "Huang,sheng hung",
            "檢定區別": "全測",
            "通訊地址": "桃園市桃園區幸福路",
            "戶籍地址": "桃園市桃園區XXX",
            "聯絡電話(住宅)": "034551235",
            "聯絡電話(手機)": "0953083990",
            "就讀學校": "中壢家商",
            "就讀科系": "商業經營科",
            "上課別": "日間部",
            "年級": "1",
            "班級": "19",
            "座號": "2",
            "身分別": "無",
            "學制": "高級中學"
        },
        {
            "pigID": "",
            "confirmStatus": false
        }]



    })
    const functionBtnLogic = () => {
        // 取消 下一步
        // 上一步 下一步
        // 上一步 送出
        switch (fillInIndex) {
            case 0:
                return (
                    <>
                        <div className="fillInData" onClick={() => { insertPhotoRef?.current?.click() }}>
                            {/* { 1 } */}

                            <div className="fillInPhoto">
                                <div className="fillInTitle">
                                    <h4>上傳你的照片</h4>
                                    <h5>檔案格式規定檔案格式規定檔案格式規定</h5>
                                </div>
                                <div className="fillInput" >
                                    <div className={`uploadbg ${!insertPhotoName["status"] ? "hide" : ""}`}><h4>{insertPhotoName["name"]}</h4></div>
                                    <div className="fillIcon" ><FontAwesomeIcon icon={faUpload} /></div>
                                    <h4><span>點擊</span> 上傳照片</h4>
                                    <h5>( 檔案限定 *.png *.jpeg *.jpg )</h5>
                                </div>
                            </div>
                        </div>
                        <div className="functionBtnContainer">
                            <div className="functionBtn" onClick={() => { checkFillinStatus() }}>取 消</div>
                            <div className="functionBtn" onClick={() => setFillInIndex(fillInIndex + 1)}>下一步</div>
                        </div>
                    </>
                )
            case 1:
                return (
                    <>
                        {/* 上傳學生資料 */}

                        <div className="fillInData">
                            <div className="fillInStudentData">
                                {userUploadFile.map((element, index) => (

                                    <div className="inputColumn" key={`inputColumn-${index}`}>
                                        {element.registerName.map((ele, index) => {
                                            const key = ele as keyof _CommonType;
                                            return (
                                                <div key={`inputItem-${index}`} className={`inputItem ${element.registerName.length == 1 ? "single" : element.registerName.length == 2 ? "split" : element.registerName.length == 3 ? "triple" : ""}`} >
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <h5 className="inputName">*{ele}</h5>
                                                        {element.isCopy ? <div className="copyBtn" onClick={() => {
                                                            setInsertData(prev => ({
                                                                ...prev,
                                                                insertFile: { ...prev.insertFile, ["戶籍地址"]: insertData["insertFile"]["通訊地址"] }
                                                            }))
                                                        }}>同 上</div> :
                                                            ""}
                                                    </div>

                                                    <input type={`${ele == "出生日期" ? "date" : "text"}`} value={insertData["insertFile"][key]} onChange={(e) => {
                                                        setInsertData(prev => ({
                                                            ...prev,
                                                            insertFile:
                                                            {
                                                                ...prev.insertFile,
                                                                [key]: e.target.value
                                                            }
                                                        }))
                                                    }} />


                                                </div>
                                            )
                                        })}
                                    </div>



                                ))}
                            </div>
                        </div >
                        <div className="functionBtnContainer">
                            <div className="functionBtn" onClick={() => setFillInIndex(fillInIndex - 1)}>上一步</div>
                            <div className="functionBtn" onClick={() => setFillInIndex(fillInIndex + 1)}>下一步</div>
                        </div>
                    </>

                )
            case 2:
                return (
                    <>


                        <div className="fillInData">
                            <div className="fillInTestData">
                                {userUploadTestFile.map((element, index) => (

                                    <div className="inputColumn" key={`inputColumn-2-${index}`}>
                                        {element.registerName.map((ele, index) => {

                                            const key = ele as keyof _CommonType;
                                            return (
                                                <div key={`inputItem-2-${index}`} className={`inputItem ${element.registerName.length == 2 ? "split" : element.registerName.length == 3 ? "triple" : ""}`}>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <h5 className="inputName">*{ele}</h5>
                                                        {element.isCopy ? <div className="copyBtn">同 上</div> :
                                                            ""}
                                                    </div>
                                                    {
                                                        ele != "檢定區別" && ele != "身分別" ?
                                                            <input type={`${ele == "出生日期" ? "date" : "text"}`} value={insertData["insertFile"][key]} onChange={(e) => {
                                                                setInsertData(prev => ({
                                                                    ...prev,
                                                                    insertFile:
                                                                    {
                                                                        ...prev.insertFile,
                                                                        [key]: e.target.value
                                                                    }

                                                                }))
                                                            }} />

                                                            :
                                                            ele != "身分別" ?
                                                                <Select
                                                                    onChange={(e) => {
                                                                        setInsertData((prev) => ({
                                                                            ...prev,
                                                                            insertFile: {
                                                                                ...prev.insertFile,
                                                                                ["檢定區別"]: e?.value ?? "",
                                                                            }
                                                                        }))
                                                                    }}
                                                                    value={options_type.find(

                                                                        (opt) => {
                                                                            const match = opt.value === insertData["insertFile"]["檢定區別"];

                                                                            return match;

                                                                        }
                                                                    ) ?? null}
                                                                    options={options_type}
                                                                    placeholder="選擇檢定區別"
                                                                    className="selectClass"
                                                                />
                                                                :
                                                                <Select
                                                                    onChange={(e) => {

                                                                        setInsertData((prev) => ({
                                                                            ...prev,
                                                                            insertFile: {
                                                                                ...prev.insertFile,
                                                                                ["身分別"]: e?.value ?? "",
                                                                            }
                                                                        }))
                                                                    }}
                                                                    value={options_identity.find(

                                                                        (opt) => {
                                                                            const match = opt.value === insertData["insertFile"]["身分別"];
                                                                            return match;

                                                                        }
                                                                    ) ?? null}
                                                                    options={options_identity}
                                                                    placeholder="選擇身分別"
                                                                    className="selectClass"
                                                                />
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="functionBtnContainer">
                            <div className="functionBtn" onClick={() => setFillInIndex(fillInIndex - 1)}>上一步 </div>
                            <div className="functionBtn" onClick={() => submitInsertData()}>送 出</div>
                        </div>
                    </>
                )
            case 3:

        }

    }

    const handleLoading = () => {
        setLoadingState(false);
        setTimeout(() => {
            setLoadingState(true);
        }, 800);
    }


    const handleEditDone = () => {
        setpenEdit(false);
        if (pendingRef.current) {
            const value = pendingRef.current?.value;
            setUploadStatus(prev => ({ ...prev, userInputName: value }))
        }
    }

    // photo upload //
    const photoUpload = (): void => {
        let photoName = "";
        if (uploadPhotoRef.current) {
            photoName = uploadPhotoRef.current.value;
        }
        handleCarouselItemSep(4);
        setUploadStatus(prev => ({ ...prev, uploadPhotoName: photoName }))
        // files deliver
    }
    const handleinsertPhotoName = (): void => {
        let photoName = "";
        if (insertPhotoRef.current) {
            photoName = insertPhotoRef.current.value;
        }
        setInsertPhotoName(prev => ({ ...prev, "status": true, "name": photoName }));
    }
    const handleInsertWord = (): void => {
        // let photoName = "";
        // if (insertPhotoRef.current) {
        //     photoName = insertPhotoRef.current.value;
        // }
        // setInsertPhotoName(prev => ({ ...prev, "status": true, "name": photoName }));
        handleCarouselItemSep(2);
    }

    const stringSplit = (arg: string | undefined) => {
        // let resultString = "";
        // if (uploadStatus.fileName && uploadStatus.fileName.length > 6) {
        //     resultString = (uploadStatus.userInputName).slice(0, 4);
        //     console.log(123);
        //     return (resultString + "...")

        // }
        // return (uploadStatus.fileName)
        if (arg && arg.length > 6) {
            return (arg.slice(0, 5) + "..");
        }
        return (arg);
    }

    // upload Events //

    const submitForm = () => {

        const finalData = new FormData();
        const data_photo = uploadPhotoRef.current?.files?.[0];
        const data_file = uploadFileRef.current?.files;
        const data_name = uploadFileNameRef.current?.value;
        console.log("1232131232132logogoogogogog", data_photo, data_file, data_name);

        if (data_photo && data_file && data_name && template) {
            finalData.append("user_photo", data_photo);
            Array.from(data_file).forEach((ele, index) => {
                finalData.append("user_file", ele);
            })
            finalData.append("data_name", data_name);
            console.log("logoogogogoogogogog", finalData);

            const URL = "http://localhost:3000/upload";
            fetch(URL, {
                method: "POST",
                credentials: "include",
                // headers:{
                //     "Content-Type" : ""
                // },
                // body: JSON.stringify({ "excelFile": data_file, "fileName": data_name, "photoFile": data_photo })
                body: finalData
            })
                .then(res => {
                    console.log("ress---------", res);
                })
                .catch(err => console.warn(err))
        }
        else {
            // alert(2);
            console.log(data_photo);
            console.log(data_file);
            console.log(data_name);

        }
    }

    const preSubmitUpload = (): void => {
        // const uploadPhoto : FileList | null | undefined = uploadPhotoRef.current?.files;
        const formData = new FormData()

        if (uploadStatus.status) {
            // const uploadName: string | undefined = uploadFileNameRef.current?.value;
            if (uploadStatus.userInputName != undefined) {
                if (uploadFileNameRef.current) {
                    formData.append("fileName", uploadFileNameRef?.current?.value);
                }

                fetch("http://localhost:3000/createFolder",
                    {
                        // headers: new Headers({
                        //     "Content-Type":"application/json"
                        // })
                        credentials: "include",
                        method: "POST",
                        // body: JSON.stringify({ "fileName": uploadFileNameRef?.current?.value })
                        body: formData
                    }
                )
                    .then(res => res.json)
                // if throw success
                handleCarouselItemSep(1);
                // 上傳成功 frame
                setAlertFrameShow1(0);
                setUploadStatus(prev => ({ ...prev, status: false }));
            }
        }
        else {
            setNonFillout(1);
        }
    }
    const uploadTextChange = (): void => {
        setUploadStatus((prev) => {
            const pending = prev;
            uploadFileNameRef.current?.value != "" ? pending["status"] = true : pending["status"] = false;
            if (uploadFileNameRef.current) {
                pending["userInputName"] = uploadFileNameRef.current?.value;
            }
            return pending;
        });
        console.log(uploadStatus);

    }
    const verifyUpload = (): void => {
        if (uploadStatus.status) {
            setAlertFrameShow1(0);
            setRepeatAlert(1);
        }
        else {
            setAlertFrameShow1(0)
        }
    }
    const clearUploadRef = (arg: number): void => {
        console.log(uploadStatus.status);

        if (arg) {

            setRepeatAlert(0);
            // setUploadStatus({ "status": false, "fileName": "", "userInputName": ""  });
            setUploadStatus(prev => ({
                ...prev,
                status: false,
                fileName: "",
                userInputName: ""
            }))
            if (uploadFileNameRef.current) {
                uploadFileNameRef.current.value = "";
            }
        }
        else {
            setRepeatAlert(0);
            setAlertFrameShow1(1);
        }
    }
    const fileChange = () => {

        const file: string | undefined = uploadFileRef.current?.files?.[0]?.name;
        console.log(file);
        // setUploadStatus((prev) => {
        //     const pending = prev;
        //     pending["status"] = true;
        //     pending["fileName"] = "file";
        //     return pending;
        // })
        // setUploadStatus({ "status": true, "fileName": file });
        setUploadStatus((prev) => ({
            ...prev,
            status: true,
            fileName: file
        }))
        handleCarouselItemSep(3);
    }


    const checkFillinStatus = () => {

        setFillInFrame(false)
        if (insertPhotoRef.current != null) {
            // for(const key in insertData.insertFile){
            //     console.log(key);

            //     if(insertData.hasOwnProperty(key)){
            //         console.log(key);
            //     }
            // }

            Object.entries(insertData.insertFile).forEach((([key, value]) => {
                if (!value) {
                    setNonFillout(1);
                    setAlertText("您尚有欄未填寫完畢");
                    //    setFillInFrame(true);
                }
            }))

        }
    }
    ///////////////////////////////////////////

    const clickWordRef = (): void => {
        if (wordFileRef) {
            wordFileRef.current?.click();
        }
    }
    const clickAlertRef = (): void => {
        if (uploadFileRef) {
            uploadFileRef.current?.click();
        }
    }
    const clickPhotoRef = (): void => {
        if (uploadPhotoRef) {
            uploadPhotoRef.current?.click();
        }
    }

    const handleAlertFrame = (arg: number): void => {
        if (!carouselItemDone[arg]) {
            switch (arg) {
                case 0:
                    setAlertFrameShow0(1);
                    break;
                case 1:

                    if (!carouselItemDone[1]) {
                        setAlertFrameShow1(1);
                    }
                    break;
                case 2:
                    clickWordRef()
                    // handleCarouselItemSep(2);
                    break;
                case 3:
                    clickAlertRef();
                    break;
                case 4:
                    clickPhotoRef();
                    break;
                case 5:
                    setEditAlertFrame(1);
                    break;
                case 6:
                    submitForm();
                    break;
                default:
                    console.error("there's an error of argument deliever");
            }
        }
        else if (arg == 5) {
            setEditAlertFrame(1);
        }
        else {
            setNonFillout(1);
            setAlertText("您已上傳過資料");
        }
    }
    const handleCarouselItemSep = (index: number) => {

        setCarouselItemDone((prev) => {
            if (!prev[index]) {
                const newArr = [...prev];
                newArr[index] += 1;
                if (progressionValue + 14 > 100) {
                    setProgressionValue(100);
                }
                else {
                    setProgressionValue(progressionValue + 14);
                }

                return newArr;
            }
            return prev;
        })
    }
    const handleDownloadTemplate = (arg: number): void => {
        if (arg) {
            const a = document.createElement("a");
            // a.href = "../../public/template.xlsx";
            a.href = "../../public/convertTemplate.7z";
            // template.xlsx
            // a.href = "../../public/test.pdf";
            a.download = "桃竹區在校生技能檢定網路報名系統範本";
            a.click();
        }
        setTemplate(true);
        setAlertFrameShow0(0);
        handleCarouselItemSep(0);

    }
    // const [pageContent , setPageContent] = useState();
    // useEffect(()=>{
    //     changePage(currentPage);
    //     console.log(currentPage);
    // },[currentPage])

    const triggerExportButton = () => {
        triggerExportRef.current?.triggerExport();
    }
    const triggerChange = (e: number) => {
        // loadingRef.current?.triggerChange();
        setLoadingState(false);
        setTimeout(() => {
            setCurrentPage(e);

            setLoadingState(true);
        }, 800);
    }

    const saveFile = () => {
        setEditAlertFrame(0);
        handleCarouselItemSep(5);

    }


    const changePage = (crt: number) => {
        switch (crt) {
            case 0:
                return (
                    <div className="registerContainer">
                        <h2>報名登錄</h2>

                        {/* modal out event */}


                        <div className="progressionContainer">
                            <div className="progression">
                                <div className="progression_percent" style={{ width: `${progressionValue}%` }} />
                            </div>
                            <div className="percent_value"><h5>{progressionValue}%</h5></div>
                        </div>
                        <div className="swiper-wrap-container">
                            <SwiperCarousel handleAlertFrame={handleAlertFrame} carouselItemDone={carouselItemDone} />
                        </div>
                        <div className="line" />
                        <div className="submitDiv">
                            <div className="carouselIconContainer">
                                <div className="carouselIcon icon_prev"><FontAwesomeIcon icon={faAngleLeft} /></div>
                                <div className="carouselIcon icon_next"><FontAwesomeIcon icon={faAngleRight} /></div>
                            </div>
                            {/* <button className="registerSubmit">送出資料  <FontAwesomeIcon icon={faPaperPlane} /></button> */}
                            {/* 我submit鍵到底要放哪 右下角 還是卡片的最後一個 */}
                        </div>
                    </div >
                );
                break;
            case 1:
                return (
                    <DataTableContainer handleFetch={handleFetch} setConfirmAll={setConfirmAll} radioRef={radioRef} setTempPigID={setTempPigID} setRadioChecked={setRadioChecked} radioChecked={radioChecked} currentFolderName={currentFolderName} setCurrentFolderName={setCurrentFolderName} deleteEditData={deleteEditData} setEditViewData={setEditViewData} setDoubleCheck={setDoubleCheck} setEditFrameState={setEditFrameState} setViewFrameState={setViewFrameState} setFillInFrame={setFillInFrame} setLoadingState={setLoadingState} modalShow={modalShow} setModalShow={setModalShow} />

                )
                break;
            case 2:
                return (
                    <>
                        <ViewComponent setEditViewData={setEditViewData} setEditFrameState={setEditFrameState} setViewFrameState={setViewFrameState} setLoadingState={setLoadingState} setModalShow={setModalShow} />
                    </>
                )
                break;
            case 3:
                return (
                    // <div className="codeSearchContainer">

                    <SearchCode />

                    // </div>
                )
            default:
                break;
        }
    }
    return (
        cookie ? (

            <div className="registerFrameContainer">
                <input type="file" id="hiddenInput" style={{ display: "none" }} ref={uploadFileRef} onChange={fileChange} />
                <input type="file" id="uploadPhotoRef" style={{ display: "none" }} ref={uploadPhotoRef} onChange={photoUpload} accept="image/*," webkitdirectory="true"  {...({ webkitdirectory: "" } as any)} />
                <input type="file" id="wordFileRef" style={{ display: "none" }} ref={wordFileRef} onChange={handleInsertWord} accept="image/*," webkitdirectory="true"  {...({ webkitdirectory: "" } as any)} />


                <input type="file" id="insertPhotoRef" style={{ display: "none" }} ref={insertPhotoRef} onChange={handleinsertPhotoName} accept="image/*," />

                {/* <div className="notify">

            </div> */}


                <ViewStudentContainer viewData={EditViewData} setViewFrameState={setViewFrameState} viewFrameState={viewFrameState} />
                <EditViewStudentContainer setEditViewData={setEditViewData} submitEditData={submitEditData} EditViewData={EditViewData} editFrameState={editFrameState} setEditFrameState={setEditFrameState} />



                {/* 身分證號碼
                    中文姓名
                    出生日期
                    報簡職類
                    英文姓名
                    檢定區別
                    通訊地址
                    戶籍地址
                    聯絡電話(住宅)
                    聯絡電話(手機)
                    就讀學校
                    就讀科系
                    上課別
                    年級
                    身分別
                    學制 */}


                <div className={`viewDataContainer ${!fillInFrame ? "op0" : ""}`}>
                    <div className="viewData">
                        <div className="viewNavigation">
                            <div className="throughLine" />
                            <div className={`naviItem ${fillInIndex != 0 ? "currentFrame" : ""}`}>
                                <div className="naviIcon"><FontAwesomeIcon icon={faPhotoVideo} /></div>
                                <h5>學生照片</h5>
                            </div>
                            <div className={`naviItem ${fillInIndex != 1 ? "currentFrame" : ""}`}>
                                <div className="naviIcon"><FontAwesomeIcon icon={faFile} /></div>
                                <h5>學生資料</h5>
                            </div>
                            <div className={`naviItem ${fillInIndex != 2 ? "currentFrame" : ""}`}>
                                <div className="naviIcon"><FontAwesomeIcon icon={faTableList} /></div>
                                <h5>檢定資料</h5>
                            </div>
                        </div>
                        <div className="line" />
                        {functionBtnLogic()}

                    </div>
                </div>

                <div className={`editFrameContainer ${editAlertFrame ? "" : "op0"}`}>
                    <div className="editFrame">

                        <div className="editTextsContainer">
                            <h2>確認資料</h2>
                            <h5>請再次確認學生資料，編輯完畢點擊下方儲存鍵</h5>
                        </div>

                        <div className="line" />
                        <div className="editContent">
                            <div className="editPhotoContainer">
                                <div className="editPhoto"><FontAwesomeIcon icon={faImage} /></div>
                                <div className="editPhotoName">
                                    <h4>{stringSplit(uploadStatus.uploadPhotoName)}</h4>
                                    <div className="editIcon" onClick={clickPhotoRef}><FontAwesomeIcon icon={faRepeat} /></div>
                                </div>
                            </div>
                            <div className="editFilesContainer">
                                <div className="editFile">
                                    <div className="editIcon"><FontAwesomeIcon icon={faDatabase} /></div>
                                    <div className="editFileTexts">
                                        <h3 className={`${uploadStatus.fileName == "" ? "redT" : ""}`}>Word檔案</h3>
                                        <h4>{stringSplit(uploadStatus.fileName)}</h4>
                                    </div>
                                    <div className="editControlContainer">
                                        <div className="editControl">
                                            <div className="icon" onClick={() => { uploadFileRef.current?.click() }}>
                                                <FontAwesomeIcon icon={faUpload} />
                                            </div>
                                            <div className="icon" onClick={() => { setUploadStatus(prev => ({ ...prev, fileName: "" })) }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="editFile">
                                    <div className="editIcon"><FontAwesomeIcon icon={faDatabase} /></div>
                                    <div className="editFileTexts">
                                        <h3 className={`${uploadStatus.fileName == "" ? "redT" : ""}`}>上傳檔案</h3>
                                        <h4>{stringSplit(uploadStatus.fileName)}</h4>
                                    </div>
                                    <div className="editControlContainer">
                                        <div className="editControl">
                                            <div className="icon" onClick={() => { uploadFileRef.current?.click() }}>
                                                <FontAwesomeIcon icon={faUpload} />
                                            </div>
                                            <div className="icon" onClick={() => { setUploadStatus(prev => ({ ...prev, fileName: "" })) }}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="editClsContainer">
                            <div className="editCls" onClick={() => { setEditAlertFrame(0) }}>關閉</div>
                            <div className="editCls" onClick={saveFile}>儲存</div>
                        </div>
                    </div>
                </div>

                <div className={`alertFrameContainer ${!alertFrameShow1 ? "op0" : ""}`}>
                    <div className="uploadFrame">
                        <div className="uploadFrameText">
                            <h2>上傳新檔案名稱</h2>
                            {/* <h5>請上傳範本編輯後的學生資料，支援 Excel 格式，請確保符合規範</h5> */}
                        </div>
                        <div className="line" />
                        <div className="uploadColumn">
                            <h3><span style={{ color: "red" }}>*</span>檔案名稱</h3>
                            <input type="text" ref={uploadFileNameRef} onChange={uploadTextChange} />
                        </div>
                        {/* <div className="uploadColumn">
                            <h3><span style={{ color: "red" }}>*</span>上傳檔案</h3>
                            
                            <div className="uploadInput" onClick={clickAlertRef}>
                                <div className={`uploadbg ${!uploadStatus["status"] ? "hide" : ""}`}><h4>{uploadStatus["fileName"]}</h4></div>
                                <div className="uploadIcon" ><FontAwesomeIcon icon={faUpload} /></div>
                                <h4><span>點擊</span> 上傳檔案</h4>
                                <h5>( 檔案限定 *.xlsx )</h5>
                            </div>

                        </div> */}
                        <div className="uploadButtonContainer">
                            <div className="uploadButton" onClick={verifyUpload}>取 消</div>
                            <div className="uploadButton" onClick={preSubmitUpload}>上 傳</div>
                        </div>
                    </div>
                </div>

                {/* ** alertFrame repeat problem */}
                <div className={`alertFrameContainer ${!confirmAll ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon" style={{ color: "rgb(204, 194, 56)" }}>
                            <FontAwesomeIcon icon={faWarning} />
                        </div>
                        <div className="alert_text">
                            <h2>您是否要確定全部資料</h2>
                            {/* <h4>( 若已下載過即可略過 )</h4> */}
                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => setConfirmAll(0)}>取 消</div>
                            <div className="alert_option_button" onClick={() => submitConfirmAll()}>確 定</div>
                        </div>
                    </div>
                </div>
                <div className={`alertFrameContainer ${!radioChecked ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon" style={{ color: "rgb(204, 194, 56)" }}>
                            <FontAwesomeIcon icon={faWarning} />
                        </div>
                        <div className="alert_text">
                            <h2>您是否要確定此筆資料</h2>
                            {/* <h4>( 若已下載過即可略過 )</h4> */}
                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => setRadioChecked(0)}>取 消</div>
                            <div className="alert_option_button" onClick={() => confirmSubmit()}>確 定</div>
                        </div>
                    </div>
                </div>
                <div className={`alertFrameContainer ${!alertFrameShow0 ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon">
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <div className="alert_text">
                            <h2>您是否已下載過範本？</h2>
                            <h4>( 若已下載過即可略過 )</h4>
                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => handleDownloadTemplate(0)}>略 過</div>
                            <div className="alert_option_button" onClick={() => handleDownloadTemplate(1)}>下 載</div>
                        </div>
                    </div>
                </div>
                <div className={`alertFrameContainer sucessFrame ${!sucessFrame ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="alert_text">
                            {/* <h2>您已經輸入/上傳資料<br/>確定要退出嗎？</h2> */}
                            {/* <h2>您已經輸入 / 上傳資料，確定要退出嗎？</h2> */}
                            <h2>上傳完成</h2>
                            {/* <h4>( 未儲存的資料可能會遺失 )</h4> */}
                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => setSucessFrame(0)}>取 消</div>
                            {/* <div className="alert_option_button" onClick={() => clearUploadRef(1)}>確 定</div> */}
                        </div>
                    </div>
                </div>
                <div className={`alertFrameContainer repeat ${!repeatAlert ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon">
                            <FontAwesomeIcon icon={faWarning} />
                        </div>
                        <div className="alert_text">
                            {/* <h2>您已經輸入/上傳資料<br/>確定要退出嗎？</h2> */}
                            {/* <h2>您已經輸入 / 上傳資料，確定要退出嗎？</h2> */}
                            <h2>{repeatText}</h2>
                            <h4>( 未儲存的資料可能會遺失 )</h4>
                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => clearUploadRef(0)}>取 消</div>
                            <div className="alert_option_button" onClick={() => clearUploadRef(1)}>確 定</div>
                        </div>
                    </div>
                </div>
                <div className={`alertFrameContainer repeat ${!nonFillout ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon">
                            <FontAwesomeIcon icon={faWarning} />
                        </div>
                        <div className="alert_text">

                            {/* <h2>您有欄位尚未填寫完畢</h2> */}
                            <h2>{alertText}</h2>

                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => setNonFillout(0)}>取 消</div>
                            {/* <div className="alert_option_button" onClick={() => clearUploadRef(1)}>確 定</div> */}
                        </div>
                    </div>
                </div>

                <div className={`alertFrameContainer repeat ${!doubleCheck ? "op0" : ""}`}>
                    <div className="alertFrame">
                        <div className="alert_icon">
                            <FontAwesomeIcon icon={faWarning} />
                        </div>
                        <div className="alert_text">

                            {/* <h2>您有欄位尚未填寫完畢</h2> */}
                            <h2>您確定要刪除此學生資料？</h2>

                        </div>
                        <div className="alert_option">
                            <div className="alert_option_button" onClick={() => { setDoubleCheck(0) }}>取 消</div>
                            <div className="alert_option_button" onClick={() => deleteEditData(1, "")}>確 定</div>
                        </div>
                    </div>
                </div>



                {/* <div className="uploadFileFrameContainer"></div> */}
                <Loading arg={loadingState} />
                <div className="innerContainer">
                    <NavbarComponent />
                    <div className="bottomContainer">
                        <div className="leftSideContainer">
                            <div className="selectionComponent">
                                <div className="itemContainer ">
                                    <div className={`item ${currentPage == 0 ? "currentC" : 0}`} onClick={() => { triggerChange(0) }}><div className="decoration"><FontAwesomeIcon icon={faUser} /></div><h4>報名登錄</h4></div>
                                    <div className={`item ${currentPage == 1 ? "currentC" : 0}`} onClick={() => { triggerChange(1) }}><div className="decoration"><FontAwesomeIcon icon={faDatabase} /></div><h4>報名資料</h4></div>
                                    <div className={`item ${currentPage == 2 ? "currentC" : 0}`} onClick={() => { triggerChange(2) }}><div className="decoration"><FontAwesomeIcon icon={faPrint} /></div><h4>資料列印</h4></div>
                                    <div className={`item ${currentPage == 3 ? "currentC" : 0}`} onClick={() => { triggerChange(3) }}><div className="decoration"><FontAwesomeIcon icon={faMagnifyingGlass} /></div><h4>代碼查詢</h4></div>
                                </div>
                                <div className="line" />
                                <div className="settingContainer" onClick={() => {
                                    if (insertData["insertFile"]["中文姓名"] != "admin") {
                                        setNonFillout(1);
                                        setAlertText("非管理員請勿開啟！");
                                    }
                                    else {

                                    }
                                }}>
                                    <div className="item"><div className="decoration"><FontAwesomeIcon icon={faGear} /></div><h4>設 定</h4></div>
                                </div>

                            </div>
                        </div>
                        <div className="rightSideContainer">
                            {changePage(currentPage)}
                        </div>
                    </div>
                </div>
                <div className={`viewDataToggler ${!modalShow ? "hidden" : ""}`}>
                    <div className="closeBtn" onClick={() => setModalShow(0)}>
                        <FontAwesomeIcon icon={faX} />
                    </div>
                </div>
            </div>
        )
            :
            null
    )
}

export default RegisterFrame;