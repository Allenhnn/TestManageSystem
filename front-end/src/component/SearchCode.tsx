import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, GlobalFiltering } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { forwardRef, useState, useImperativeHandle, useRef } from "react";

// 
import schoolID from "../../../back-end/data_json/school_ID.json";
import school from "../../../back-end/data_json/school.json";
import subject from "../../../back-end/data_json/subject.json";
import classJson from "../../../back-end/data_json/class.json";
import testType from "../../../back-end/data_json/testType.json";
import studyType from "../../../back-end/data_json/studyType.json";
import schoolTYpe from "../../../back-end/data_json/schoolTYpe.json";
import specific from "../../../back-end/data_json/specific.json";



// import ViewTable from "./ViewTable";
import CodeTableSearchContainer from "./CodeTableSearchContainer";
import jsonData from "../json/tableData.json"

const SearchCode = () => {
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [viewData, setViewData] = useState(jsonData);
    console.log("viewData", viewData);
    const [viewHeightCSS, setViewHeightCSS] = useState<number | undefined>(0);
    const viewHeightRef = useRef<HTMLDivElement>(null);
    const [handleText, setHandleText] = useState([]);
    // 優化使用者點擊輸入框UX
    const inputRef = useRef<HTMLInputElement>(null);
    const userFocus = () => {
        inputRef.current?.focus();
    }

    const [userInputValue, setUserInputValue] = useState("");
    const userSearchEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = e.target.value;
        setUserInputValue(inputValue);
    }

    const handleResult = (arg: number) => {
        let currentData: any;
        switch (arg) {
            case 0:
                currentData = schoolID;
                // console.log("213", schoolID)
                break;
            case 1:
                currentData = school;
                break;
            case 2:
                currentData = subject;
                break;
            case 3:
                currentData = classJson;
                break;
            case 4:
                currentData = testType;
                break;
            case 5:
                currentData = studyType;
                break;
            case 6:
                currentData = schoolTYpe;
                break;
            case 7:
                currentData = specific;
                break;
        }
        // alert(currentData)
        setHandleText(currentData)
    }

    return (
        <div className="SearchCode">
            <div className="leftsideContainer">
                {/* <div className="searchBarContainer">
                    <div className="searchBar" onClick={userFocus}>
                        <input type="text" value={globalFilter} ref={inputRef} onChange={(e) => { setGlobalFilter(e.target.value) }}
                            placeholder={"請輸入要搜尋的學生資料"} />
                        <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    </div>
                </div> */}
                <div className="previewDatas" ref={viewHeightRef} ><CodeTableSearchContainer handleResult={handleResult} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} /></div>
            </div>
            <div className="rightsideContainer">
                {/* <iframe src={URL} /> */}
                <div className="header">結果：</div>
                <div className="resultFrame">
                    <div className="resultColumn">
                        {handleText.map((ele, index) => {
                            return (
                                <div>{index} : {ele}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchCode;