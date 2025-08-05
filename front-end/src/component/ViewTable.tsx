import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, GlobalFiltering } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { forwardRef, useState, useImperativeHandle } from "react";
import type { _ReloadStudentType } from "../types/_ReloadStudentType";
// import type { rowData } from "../component/DataTable";
type globalType = {

    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export type rowData = {
    
    "身分證號碼" : string;
    "中文姓名" : string;
    "出生日期" : string;
    "報簡職類" : string;
    "英文姓名" : string;
    "檢定區別" : string;
    "通訊地址" : string;
    "戶籍地址" : string;
    "聯絡電話(住宅)" : string;
    "聯絡電話(手機)" : string;
    "就讀學校" : string;
    "就讀科系" : string;
    "上課別" : string;
    "年級" : string;
    "班級" : string;
    "座號" : string;
    "身分別" : string;
    "學制" : string;
}

// type json_type = {
//     [key : string]
// }
// higher order function only receive two arguments , props needs to become a set.
// const ViewTable :React.FC<json_type> = (init_data) => {
const ViewTable = ({ globalFilter, setGlobalFilter }:globalType) => {
    // const { modalOut } = props; 
    const [data, setData] = useState<_ReloadStudentType[]>([]);
    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);
    
    const columns: ColumnDef<any>[] = [
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
    ]

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    return (
        <div className="viewTable">
            <table border={1} cellPadding={6} >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {exportData ? <th /> : <></>}

                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                            <th />
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
                            <td>
                                {/* <div style={{ display: "flex" }}> */}
                                <div className="iconEye">
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                {/* 先view就好
                                    checkbox -> multiple export 
                                    view 用成開一個modal popout 再rerender
                                    */}
                                {/* <div>
                                        <FontAwesomeIcon icon={faFileExport} />
                                    </div> */}
                                {/* </div> */}
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ViewTable;
