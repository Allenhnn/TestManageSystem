import React, { use, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faFile, faGear, faMagnifyingGlass, faPaperPlane, faPen, faPrint, faRecycle, faRepeat, faTrash, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
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
    deleteEditData: (index: number, arg: string) => void,
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setFillInFrame: React.Dispatch<React.SetStateAction<boolean>>,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>,
    setDoubleCheck: React.Dispatch<React.SetStateAction<number>>;
    setCurrentFolderName : any;
}


const DataTableContainer = ({ setCurrentFolderName,deleteEditData, setEditViewData, setDoubleCheck, setEditFrameState, setViewFrameState, setLoadingState, modalShow, setModalShow, setFillInFrame }: InputProps) => {

    const [data, setData] = useState<_ReloadStudentType[]>([]);
    const [userInfo, setUserInfo] = useState<userInfoType>({ "userName": "dexter", "fileName":  "test-1"})
    // const [modalShow, setModalShow] = useState(0);
    const [currentTable, setCurrentTable] = useState<currentTableType>({ text: "報名資料", status: false });
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [studentFilter, setStudentFilter] = useState<string>("");
    const [changePage, setChangePage] = useState<number>(0);
    const [calRows, setCalRows] = useState<rowType>({ value1: "", value2: "" });
    // const [pigID, setPigID] = useState("");

    const triggerExportRef = useRef<ExportDataType | null>(null);
    const tableHeightRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperClass>(null);


    // const enterDetailData = () => {
    //     try {
    //         const URL: string = "";
    //         fetch(URL, {
    //             headers: new Headers({
    //                 "Content-Type": "application/json",
    //                 method: "GET",
    //             })
    //         })
    //             .then(res => { res.json() })
    //             .then((jsonData:rowData[]) => { setData(jsonData) });
    //         handleLoading();
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }
    const enterDetailData = async (arg: string) => {
        // alert(arg)
        setCurrentFolderName(arg)
        setCurrentTable(prev => ({
            ...prev,
            status: false,
            text: `報名資料 / ${arg}`
        }));

        setChangePage(1);
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
        try {

            setLoadingState(false);
            const URL: string = "http://localhost:3000/getjsons";
            const headers = new Headers({
                "Content-Type": "application/json",
            })

            const fetchData = await fetch(URL, { headers: headers, credentials:"include",method: "POST", body: JSON.stringify(userInfo) });
            const getData = await fetchData.json();
            setData(getData);
            setLoadingState(true);
            setTimeout(() => {
                console.log("new data in timeout", data); // ✅可能會有資料，但不保證
            }, 0);

            console.log("slkjf");
            console.log(getData[0][0]);
            console.log("🚨 getData is", getData);
            console.log("🚨 getData[0] is", getData[0]);
            console.log("🚨 getData[0][0] is", getData[0][0]);


            // console.log(data);


        }
        catch (err) {
            console.error("enterDetailData", err);
            setLoadingState(true);
        }


    }
    useEffect(() => {
        console.log("effect data", data);

    }, [data])
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
    // 編輯***********
    const EditViewData = (arg:any , pigID:string ) => {
        // alert(pigID)
     // setEditViewData(prev => ({
        //     ...prev,
        //     insertFile: [{ ...arg }, { confirmStatus: "false", pigID: pigid }]
        // }));
        console.log("-------editview=-------");
        console.log(arg);
        let tempVal 
        
        setEditViewData(prev => ({
            ...prev,
            "insertFile": [arg, {...prev.insertFile[1] ,pigID:pigID}]
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

                            <div className={`addNewItem ${!currentTable.status ? "divNone" : ""}`} onClick={() => setFillInFrame(true)} ><FontAwesomeIcon icon={faCirclePlus} /> 新增</div>

                        </div>
                    </div>
                </div>
                <div className="tableSwiperContainer" ref={tableHeightRef}>
                    <TableSwiper
                        swiperRef={swiperRef}
                        arg1={<DataTable datas={data} setData={setData} swiperRef={swiperRef.current} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} ref={triggerExportRef}
                            enterDetailData={enterDetailData} />}
                        arg2={<StudentTable EditViewData={EditViewData} studentFilter={studentFilter} setStudentFilter={setStudentFilter} setCalRows={setCalRows} setModalShow={setModalShow} ref={triggerExportRef}
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