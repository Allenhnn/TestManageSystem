import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { DeclareContextType } from "../types/DeclareContextType";
import { forwardRef, useState, useImperativeHandle, useEffect, useContext } from "react";
import type { _ReloadStudentType } from "../types/_ReloadStudentType";
import type { _CommonType } from "../types/_CommonType";
import type { InputAction } from "react-select";

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

// 加篩選 跟 設計 查看/編輯 ui
type rowType = {
    value1: string,
    value2: string
}
type tempType = {
    pigID: string,
    index: number
}

type rowData = {
    // "name": string,
    // "type": string;
    // "identity": string;
    // "number": number;
    // "photo_n": number;
    // "all": number;
    // "pass_a": number;
    // "pass_s": number;

    "pigID": string,
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
    "comfirmStatus": boolean
}
type allProps = {
    // triggerModalShow: () => void;
    handleViewData: Function,
    EditViewData: Function,
    datas: _ReloadStudentType[],
    setData: React.Dispatch<React.SetStateAction<_ReloadStudentType[]>>,
    studentFilter: string,
    radioRef: any
    setStudentFilter: React.Dispatch<React.SetStateAction<string>>,
    setCalRows: React.Dispatch<React.SetStateAction<rowType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setRadioChecked: React.Dispatch<React.SetStateAction<number>>,
    radioChecked: number,
    setTempPigID: React.Dispatch<React.SetStateAction<tempType>>,
}

// higher order function only receive two arguments , props needs to become a set.
const StudentTable = forwardRef<ExportDataType, allProps>(({ radioRef, setTempPigID, setRadioChecked, radioChecked, EditViewData, handleViewData, datas, studentFilter, setStudentFilter, setCalRows, setModalShow }, ref) => {
    // const { modalOut } = props; 
    // const [data, setData] = useState<rowData[]>(inputData);
    // 解構版本

    const [ViewData, setViewData] = useState<_CommonType[]>([]); // initial 要給空陣列
    
    useEffect(() => {
        const merge = datas.map(([std, nested]) => ({
            ...std,
            ...nested
        }))
        datas.forEach((element,index) => {
            const radio = radioRef.current[index];
            if(radio){
                radio.checked = element[1].confirmStatus;
            }     
        });

        setViewData(merge)

    }, [datas])
   

    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const handleContext = useContext(DeclareContextType);

    //  ▲
    //  ▼
    const handleStatus = (arg: React.MouseEvent<HTMLInputElement>, row: any, index: number) => {
        // alert(row["pigID"]);
        arg.preventDefault();
        setTempPigID({
            pigID: row["pigID"],
            index: index
        })
        setRadioChecked(1);

    }
    const [columns, setColumn] = useState<ColumnDef<any>[]>([

        // {
        //     accessorKey: "pigID",
        //     // header: "準考證號碼",
        //     cell: (props: any) => <p>{props.row.index + 1 + "00499"}</p>
        // }
        // ,
        {
            accessorKey: "no",
            header: "No.",
            cell: (props: any) => <p>{props.row.index + 1}</p>
        }
        ,
        {
            accessorKey: "中文姓名",
            header: "中文姓名",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "身分證號碼",
            header: "身分證號碼",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "報簡職類",
            header: "報簡職類",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "檢定區別",
            header: "檢定區別",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "身分別",
            header: "身分別",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,

        {
            accessorKey: "confirmStatus",
            header: "目前狀態",
            cell: (props: any) => {
                if (props.getValue()) {

                    return (<div className="checkStatus done">確認</div>)
                }
                else {
                    return (<div className="checkStatus">未確認</div>)
                }
            }
        }
        ,
        {
            id: "status",
            header: "功能欄",
            size: 1,
            // maxSize: 100,
            cell: (props: any) => {
                const { pigID, confirmStatus, ...filterData } = props.row.original;
                const rowData = props.row.original;
                const index = props.row.index;
                // alert(rowData["pigID"])
                // alert("rowindex" + props.row.index);
                return (
                    <div className="functionBtn">
                        <div className="editButton" onClick={() => handleViewData(rowData)}>查看</div>
                        <div className="editButton" onClick={() => EditViewData(filterData, rowData)}>編輯</div>
                        <div className="editButton" onClick={() => handleContext?.deleteEditData(0, rowData["pigID"])}>刪除</div>
                    </div>
                )
            }
        },
        {
            accessorKey: "",
            header: "確認狀態",
            cell: (props: any) => {
                const index = props.row.index;
                return (
                    <input type="radio" name="" id="" ref={(el) => { if (el) radioRef.current[index] = el }} onClick={(e) => { handleStatus(e, props.row.original, props.row.index) }} />
                )
            }
        }

    ])

    const table = useReactTable({
        data: ViewData,
        columns,
        state: { globalFilter: studentFilter, sorting },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setStudentFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });


    const totalRows = datas.length; // 全部資料筆數
    const filteredRows = table.getRowModel().rows.length; // 過濾後資料筆數

    // setCalRows((prev) => ({
    //     ...prev,
    //     value1: String(totalRows),
    //     value2: String(filteredRows)
    // }))
    const enterDetailData = () => {

    }

    useEffect(() => {
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
        <div className="tableContainer studentTable">
            <table border={1} cellPadding={6} >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={"studentTable" + headerGroup.id} >
                            {headerGroup.headers.map((header, idx) => (
                                <th
                                    key={`studentTableTH_${header.id}_${idx}`}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: ' ▲',
                                        desc: ' ▼',
                                    }[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}

                            {/* ------------------測資------------------ */}


                            {/* {exportData ? <th /> : <></>}

                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))} */}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={"studentTable-tbody-tr-" + row.id}>

                            {
                                row.getVisibleCells().map((cell) => {

                                    
                                    return (
                                        <td key={`studentTable-td-${row.id}-${cell.column.id}-${index}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}

                                        </td>
                                    )
                                })
                            }


                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
})
export default StudentTable;


