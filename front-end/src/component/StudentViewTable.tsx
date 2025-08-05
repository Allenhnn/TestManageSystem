import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faPrint, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { DeclareContextType } from "../types/DeclareContextType";
import { forwardRef, useState, useImperativeHandle, useEffect, useContext } from "react";
import type { _ReloadStudentType } from "../types/_ReloadStudentType";
import type { _CommonType } from "../types/_CommonType";

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


type allProps = {
    // triggerModalShow: () => void;
    datas: _ReloadStudentType[],
    handleViewData: Function,
    EditViewData: Function,
    setData: React.Dispatch<React.SetStateAction<_ReloadStudentType[]>>,
    studentViewFilter: string,
    setStudentViewFilter: React.Dispatch<React.SetStateAction<string>>,
    setCalRows: React.Dispatch<React.SetStateAction<rowType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
}

// higher order function only receive two arguments , props needs to become a set.
const StudentViewTable = forwardRef<ExportDataType, allProps>(({ EditViewData, handleViewData, datas, setData, studentViewFilter, setStudentViewFilter, setCalRows, setModalShow }, ref) => {
    // const { modalOut } = props; 
    // const [data, setData] = useState<rowData[]>(inputData);
    // 解構版本
    console.log("data", datas);

    const [ViewData, setViewData] = useState<_CommonType[]>([]); // initial 要給空陣列

    useEffect(() => {
        const merge = datas.map(([std, nested]) => ({
            ...std,
            ...nested
        }))
        console.log(merge, "m");

        setViewData(merge)

    }, [datas])

    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const handleContext = useContext(DeclareContextType); 

    //  ▲
    //  ▼
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

            accessorKey: "",
            header: "功能欄",
            cell: (props: any) => {
                return (
                    <div className="allCenter" style={{ gap: "1rem" }}>
                        <div className="iconEye">
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </div>
                        <div className="iconEye next">
                            <FontAwesomeIcon icon={faPrint} />
                        </div>
                    </div>
                )
            }
        }


    ])

    const table = useReactTable({
        data: ViewData,
        columns,
        state: { globalFilter: studentViewFilter, sorting },
        onSortingChange: setSorting,
        onGlobalFilterChange: setStudentViewFilter,
        getSortedRowModel: getSortedRowModel(),
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
        <div className="tableContainer">
            <table border={1} cellPadding={6} >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
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
                        <tr key={row.id}>
                            {exportData ?

                                <td>
                                    <input type="checkbox" name={`checkbox-${index + 1}`} />
                                </td>
                                :
                                <></>
                            }

                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            {/* <td>
                                <div style={{ display: "flex" }}>
                                    <div className="iconEye next" onClick={enterDetailData}>
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                    </div>
                                </div>
                            </td> */}

                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
})
export default StudentViewTable;


