import React, { use, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronDown, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faFile, faGear, faMagnifyingGlass, faPaperPlane, faPen, faPrint, faRecycle, faRepeat, faTrash, faTriangleCircleSquare, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import TableSwiper from "../component/TableSwiper.tsx";
import StudentTable from "../component/StudentTable.tsx"
import DataTable, { type ExportDataType, type rowData } from "../component/DataTable.tsx";
import { DeclareContextType } from "../types/DeclareContextType.tsx";

import DATA from "../json/testPigID.json";
import type { _ReloadStudentType } from "../types/_ReloadStudentType.ts";
import type { _ReloadStudentTypeList } from "../types/_ReloadStudentType.ts";
import type { _EditType } from "../types/_EditType.ts";


type tempType = {
    pigID: string,
    index: number
}
type userInfoType = {
    userName: string,
    fileName: string

}
type currentTableType = {
    text: string,
    status: boolean
}
type rowType = {
    value1: string,
    value2: string
}
type InputProps = {
    setLoadingState: Function,
    modalShow: number,
    radioRef: any
    deleteEditData: (index: number, arg: string) => void,
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setFillInFrame: React.Dispatch<React.SetStateAction<boolean>>,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>,
    setDoubleCheck: React.Dispatch<React.SetStateAction<number>>;
    setRadioChecked: React.Dispatch<React.SetStateAction<number>>;
    setCurrentFolderName: any,
    radioChecked: number,
    setTempPigID: React.Dispatch<React.SetStateAction<tempType>>,
    setConfirmAll: React.Dispatch<React.SetStateAction<number>>,
    handleFetch: boolean,
    currentFolderName: string,
    handleSuccess: Function
}


const DataTableContainer = ({ handleSuccess, handleFetch, setConfirmAll, radioRef, setTempPigID, setRadioChecked, radioChecked, currentFolderName, setCurrentFolderName, deleteEditData, setEditViewData, setDoubleCheck, setEditFrameState, setViewFrameState, setLoadingState, modalShow, setModalShow, setFillInFrame }: InputProps) => {

    const [data, setData] = useState<_ReloadStudentType[]>([]);
    const [userInfo, setUserInfo] = useState<userInfoType>({ "userName": "dexter", "fileName": "test-1" })
    // const [modalShow, setModalShow] = useState(0);

    const [currentTable, setCurrentTable] = useState<currentTableType>({ text: "報名資料", status: false });
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [studentFilter, setStudentFilter] = useState<string>("");
    const [changePage, setChangePage] = useState<number>(0);
    const [calRows, setCalRows] = useState<rowType>({ value1: "", value2: "" });
    const [moreFn, setMoreFn] = useState(false);
    // const [pigID, setPigID] = useState("");

    const triggerExportRef = useRef<ExportDataType | null>(null);
    const tableHeightRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperClass>(null);

    // const [tempStorage , setTempStorage] = useState()


    useEffect(() => {

        fetchFn(currentFolderName);
        // ✅ 第二次之後才執行
        // if(currentFolderName && handleFetch){}
    }, [handleFetch]);


    // }
    const fetchFn = async (arg: string) => {
        console.log(21312312312312123213);
        console.log(arg);


        try {

            setLoadingState(false);
            const URL: string = "http://localhost:3000/getjsons";
            const headers = new Headers({
                "Content-Type": "application/json",
            })
            // const fetchData = await fetch(URL, { headers: headers, credentials: "include", method: "POST", body: JSON.stringify({ "fileName": arg }) });
            // const getData = await fetchData.json();
            fetch(URL, {
                headers: headers,
                credentials: "include",
                method: "POST",
                body: JSON.stringify({ "fileName": arg })
            })
                .then(res => res.json())
                .then(response => {
                    // alert(0)
                    setData(response);
                    setLoadingState(true);
                })
            console.log(0);
            // console.log("fetchData", fetchData);
            // console.log("getData", getData);

            // console.log(data);
            setLoadingState(true);


        }
        catch (err) {
            console.error("enterDetailData", err);
            setLoadingState(true);
        }
    }

    const enterDetailData = (arg: string) => {

        setCurrentFolderName(arg)
        setCurrentTable(prev => ({
            ...prev,
            status: false,
            text: `報名資料 / ${arg}`
        }));

        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
        fetchFn(arg)
        setChangePage(1);

    }
    // 查看
    const handleViewData = (arg: any) => {
        console.log("haaaaaaa", arg);

        setEditViewData(prev => ({
            ...prev,
            insertFile: [arg, prev.insertFile[1]]
        }));
        // setEditViewData();
        // fetch -> setState
        // 豬解：反正這邊就是明天要跟豬串起來的fetch 明天再用 更新資料而已

        setViewFrameState(1);
    }
    const handleCombine = () => {
        try {
            setLoadingState(false);
            const formData = new FormData();
            const folderName = currentFolderName;
            formData.append("chooseFile", folderName)
            fetch("http://localhost:3000/fillWd", {
                credentials: "include",
                method: "POST",
                body: formData
            })
                .then(res => { if (res.status == 200) { handleSuccess(), setLoadingState(false); } })

        }
        catch (err) {
            console.error("error")
        }

    }
    // 編輯***********
    const EditViewData = (arg: any, pigID: string) => {
        // alert(pigID)
        // setEditViewData(prev => ({
        //     ...prev,
        //     insertFile: [{ ...arg }, { confirmStatus: "false", pigID: pigid }]
        // }));
        console.log("-------editview=-------");
        console.log(arg);

        setEditViewData(prev => ({
            ...prev,
            "insertFile": [arg, { ...prev.insertFile[1], pigID: pigID }]
        }));

        setEditFrameState(1);

    }
    return (
        <DeclareContextType.Provider value={{ deleteEditData }}>
            <div className="dataTableContainer">
                <div className="navigation">
                    <div className="navigationItem">
                        <div className={`backlast prev ${!currentTable.status ? "divNone" : ""}`} onClick={() => { setChangePage(0); swiperRef.current ? swiperRef.current.slidePrev() : null }}><FontAwesomeIcon icon={faCircleChevronLeft} /> 返回</div>
                        <div className="icon"><FontAwesomeIcon icon={faFile} />
                        </div>
                        <h4>{currentTable.text}</h4>
                    </div>
                    <div className="searchBarContainer">
                        <div className="searchBar">
                            {changePage == 0 ?
                                <input type="text" className="searchInput" value={globalFilter} onChange={(e) => { setGlobalFilter(e.target.value) }} placeholder="請輸入要搜尋的資料夾" />
                                :
                                <input type="text" className="searchInput" value={studentFilter} onChange={(e) => { setStudentFilter(e.target.value) }} placeholder="請輸入要搜尋的資料" />
                            }
                            <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>

                        </div>
                        <div className="totalRows">
                            <div className={`dropdownList ${moreFn ? "" : "op0"}`} >
                                <div className="dropdownItem" onClick={() => setFillInFrame(true)} > 新增 <FontAwesomeIcon icon={faCirclePlus} /></div>
                                <div className="dropdownItem" onClick={() => handleCombine()} > 合併資料 <FontAwesomeIcon icon={faDatabase} /></div>
                                <div className="dropdownItem" onClick={() => setConfirmAll(1)}> 確認全部 <FontAwesomeIcon icon={faCheckCircle} /></div>
                            </div>
                            {/* <Select options={function_type} placeholder="更多" /> */}
                            <div className={`addNewItem ${!currentTable.status ? "divNone" : ""}`} onClick={() => setMoreFn(moreFn ? false : true)}>更多功能 <FontAwesomeIcon icon={faCircleChevronDown} /> </div>
                            {/* <div className={`addNewItem ${!currentTable.status ? "divNone" : ""}`} onClick={() => setFillInFrame(true)} ><FontAwesomeIcon icon={faCirclePlus} /> 新增</div> */}

                        </div>
                    </div>
                </div>
                <div className="tableSwiperContainer" ref={tableHeightRef}>
                    <TableSwiper
                        swiperRef={swiperRef}
                        arg1={<DataTable datas={data} setData={setData} swiperRef={swiperRef.current} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} ref={triggerExportRef}
                            enterDetailData={enterDetailData} />}
                        arg2={<StudentTable radioRef={radioRef} setTempPigID={setTempPigID} setRadioChecked={setRadioChecked} radioChecked={radioChecked} EditViewData={EditViewData} studentFilter={studentFilter} setStudentFilter={setStudentFilter} setCalRows={setCalRows} setModalShow={setModalShow} ref={triggerExportRef}
                            datas={data} setData={setData} handleViewData={handleViewData} />}

                        setText={setCurrentTable}

                    // tableSwiper > studentTable - datatable
                    />
                </div>
            </div>
        </DeclareContextType.Provider>
    )
}
export default DataTableContainer;