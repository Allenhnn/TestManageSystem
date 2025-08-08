import React, { use, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faFile, faGear, faMagnifyingGlass, faPaperPlane, faPen, faPrint, faRecycle, faRepeat, faTrash, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import TableSwiper from "../component/TableSwiper.tsx";
import StudentTable from "../component/StudentTable.tsx"
import DataTable, { type ExportDataType, type rowData } from "../component/DataTable.tsx";
import { DeclareContextType } from "../types/DeclareContextType.tsx";

import DATA from "../json/testPigID.json";
import type { _ReloadStudentType } from "../types/_ReloadStudentType.ts";
import type { _ReloadStudentTypeList } from "../types/_ReloadStudentType.ts";
import type { _EditType } from "../types/_EditType.ts";

import ViewTable from "./ViewTable";
import jsonData from "../json/tableData.json"
import PrinterSwiper from "./PrinterSwiper";
import StudentViewTable from "./StudentViewTable.tsx";
import ShowTable from "./ShowTable.tsx";

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
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>,
}

const ViewComponent = ({ setEditViewData, setEditFrameState, setViewFrameState, setLoadingState, setModalShow }: InputProps) => {


    const [URLframe, setURLframe] = useState("../../../back-end/user_data/allenhnn/pigFOlder/combine.pdf")
    // const [modalShow, setModalShow] = useState(0);
    const [currentTable, setCurrentTable] = useState<currentTableType>({ text: "報名資料", status: false });
    const [studentViewFilter, setStudentViewFilter] = useState<string>("");
    const [changePage, setChangePage] = useState<number>(0);
    const [calRows, setCalRows] = useState<rowType>({ value1: "", value2: "" });
    // const [pigID, setPigID] = useState("");

    const triggerExportRef = useRef<ExportDataType | null>(null);
    const tableHeightRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<_ReloadStudentType[]>(DATA as _ReloadStudentType[]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [viewData, setViewData] = useState(jsonData);
    console.log("viewData", viewData);
    const [viewHeightCSS, setViewHeightCSS] = useState<number | undefined>(0);
    const viewHeightRef = useRef<HTMLDivElement>(null);

    // 優化使用者點擊輸入框UX
    const inputRef = useRef<HTMLInputElement>(null);
    const userFocus = () => {
        inputRef.current?.focus();
    }
    const swiperRef = useRef<SwiperClass>(null);

    const [userInputValue, setUserInputValue] = useState("");
    const userSearchEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = e.target.value;
        setUserInputValue(inputValue);
    }
    const enterDetailData = async (arg: string) => {
        console.log("piyna", arg);

        try {

            setLoadingState(false);
            const link: string = "http://localhost:3000/getPdf";
            const headers = new Headers({
                "Content-Type": "application/json",
            })

            fetch(link, {
                headers: headers,
                credentials: "include",
                method: "POST",
                body: JSON.stringify({ "fileName": arg })
            })
                .then(res => {
                    return res.blob();
                })
                .then(blob => {
                    // const url = URL.createOb
                    const url = URL.createObjectURL(blob);
                    const iframe = document.getElementById("pdfViewer") as HTMLIFrameElement;
                    iframe.src = url;
                    setLoadingState(true);
                })

            // setData(getData);

            // console.log(data);


        }
        catch (err) {
            console.error("enterDetailData", err);
            setLoadingState(true);
        }


    }
    // 優化
    useEffect(() => {
        // setPdfURL()
        if (inputRef.current) {
            const viewHeight = viewHeightRef.current?.offsetHeight;
            setViewHeightCSS(viewHeight);
        }
    }, [])

    // 查看
    
    const handledownload = (arg :any) => {
           setLoadingState(false);
            const link: string = "http://localhost:3000/getPdf";
            const headers = new Headers({
                "Content-Type": "application/json",
            })

            fetch(link, {
                headers: headers,
                credentials: "include",
                method: "POST",
                body: JSON.stringify({ "fileName": arg })
            })
                .then(res => {
                    return res.blob();
                })
                .then(blob => {
                    // const url = URL.createOb
                    const url = URL.createObjectURL(blob);
                    const href = document.createElement("a");
                    // const iframe = document.getElementById("pdfViewer") as HTMLIFrameElement;
                    href.href = url;
                    href.download = url;
                    href.target = "_blank";
                    href.click();
                    // href.download = blob;
                    setLoadingState(true);
                })
    }
    // ------------------------------------------------------------

    return (
        <div className="viewContainer">
            <div className="leftsideContainer">
                <div className="searchBarContainer">
                    <div className="searchBar" onClick={userFocus}>
                        <input type="text" value={globalFilter} ref={inputRef} onChange={(e) => { setGlobalFilter(e.target.value) }}
                            placeholder={"請輸入要搜尋的資料夾"} />
                        <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    </div>
                </div>



                <div className="tableSwiperContainer">
                    <ShowTable handledownload={handledownload} datas={data} setData={setData} swiperRef={swiperRef.current} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} ref={triggerExportRef}
                        enterDetailData={enterDetailData} />


                </div>
            </div>
            <div className="rightsideContainer">
                
                <iframe id="pdfViewer" src={URLframe} />
                {/* <iframe src="../../../back-end/user_data/allenhnn/pigFOlder/combine.pdf" /> */}
            </div>
        </div >
    )
}
export default ViewComponent;