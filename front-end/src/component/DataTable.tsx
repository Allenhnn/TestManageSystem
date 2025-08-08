import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import DATA from "../json/testPigID.json";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import type { _ReloadStudentType } from "../types/_ReloadStudentType";
export type ExportDataType = {
    triggerExport: () => void;
}
// type triggerPDFmodal = {
//     triggerModalShow : () => void;
// }
// type globalFilterType = {
//     globalFilter : string,
//     setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
// }

type rowType = {
    value1: string,
    value2: string
}
export type rowData = {
    "pigID": string;
    "身分證號碼": string;
    "中文姓名": string;
    "出生日期": string;
    "報簡職類": string;
    "英文姓名": string;
    "檢定區別": string;
    "通訊地址": string;
    "戶籍地址": string;
    "聯絡電話(住宅)": string;
    "聯絡電話(手機)": string;
    "就讀學校": string;
    "就讀科系": string;
    "上課別": string;
    "年級": string;
    "班級": string;
    "座號": string;
    "身分別": string;
    "學制": string;
    "comfirmStatus": boolean;
}
type receiveData = {
    
}

type allProps = {
    // triggerModalShow: () => void;
    swiperRef: SwiperClass | null
    enterDetailData: Function,
    globalFilter: string,
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    setCalRows: React.Dispatch<React.SetStateAction<rowType>>;
    datas: _ReloadStudentType[],
    setData: React.Dispatch<React.SetStateAction<_ReloadStudentType[]>>,
}

// higher order function only receive two arguments , props needs to become a set.
const DataTable = forwardRef<ExportDataType, allProps>(({ datas , swiperRef, enterDetailData, globalFilter, setGlobalFilter, setCalRows }, ref) => {
    // const { modalOut } = props; 

    // const [data, setData] = useState(DATA);
    const [folder , setFolder] = useState<string[]>([]);

    // const [data, setData] = useState(() => {
    //     // 變平化 （解構 合併）
    //     return DATA.map(([studentInfo, nested]) => ({
    //         ...studentInfo,
    //         ...nested,
    //     }));
    // });
    const [viewData, setViewData] = useState(() => {
        // 變平化 （解構 合併）
        return DATA.map(([studentInfo, nested]) => ({
            ...studentInfo,
            ...nested,
        }));
    })



    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);



    const columns: ColumnDef<any>[] = [
        {
            
            header: "No.",
            cell: (props: any) => <p>{props.row.index + 1}</p>
        }
        ,
        {
            
            header: "資料夾名稱",
            // cell: (props: any) => <p>{props.getValue()}</p>
            accessorFn : row => row
        }
        // ,
        // {
        //     accessorKey: "中文姓名",
        //     header: "中文姓名",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "報簡職類",
        //     header: "報簡職類",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "檢定區別",
        //     header: "檢定區別",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "身分別",
        //     header: "身分別",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "confirmStatus",
        //     header: "報名狀態",
        //     cell: (props: any) => {
        //         if (props.getValue()) {

        //             return (
        //                 <div className="viewFolder">
        //                     <div className="checkStatus done">完成</div>
        //                 </div>)
        //         }
        //         else {
        //             return (
        //                 <div className="viewFolder">
        //                     <div className="checkStatus">未完成</div>
        //                 </div>
        //             )
        //         }
        //     }
        // }
    ]

    const table = useReactTable({
        data: folder,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });


    const totalRows = datas.length; // 全部資料筆數
    const filteredRows = table.getRowModel().rows.length; // 過濾後資料筆數


    const receiveData = async() => {
        const URL: string = "http://localhost:3000/getfolder";
        try {
            const res = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },

                
            })

            if (!res.ok) throw new Error("500 server error");
            const res_json = await res.json();
            // res_json.ok?
            setFolder(res_json);
            

        }
        catch (err) {
            console.error("error", err);
        }
    }
    useEffect(() => {
    receiveData();
        setCalRows((prev) => ({
            ...prev,
            value1: String(totalRows),
            value2: String(filteredRows)
        }))
    }, [totalRows, filteredRows])

    // const [totalRows] = useState(data.length); 
    // const [filteredRows] = useState(table.getRowModel().rows.length); 


    useImperativeHandle(ref, () => ({
        triggerExport: () => {
            setExportData(exportData => !exportData);

        }
    }), [])


    return (
    <div className="tableContainer">
            <table border={1} cellPadding={6} >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={"getHeaderGroups"+headerGroup.id}>
                            {exportData ? <th /> : <></>}

                            {headerGroup.headers.map((header) => (
                                <th key={"headerGroup"+header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                            <th />
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={`${row.id}-${index}`}>
                            {/* {exportData ?

                                <td>
                                    <input type="checkbox" name={`checkbox-${index + 1}`} />
                                </td>
                                :
                                <></>
                            } */}

                            {row.getVisibleCells().map((cell , cellIndex) => (
                                <td key={`${row.id}-${cell.column.id}-${cellIndex}`}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            <td>
                                <div className="iconEye next" onClick={() => enterDetailData(row.original)}>
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                </div>
                               
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
})
export default DataTable;
