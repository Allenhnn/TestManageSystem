import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { forwardRef, useState, useImperativeHandle } from "react";

export type ExportDataType = {
    triggerExport: () => void;
}
type triggerPDFmodal = {
    triggerModalShow : () => void;
}

// higher order function only receive two arguments , props needs to become a set.
const DataTable = forwardRef<ExportDataType,triggerPDFmodal >(({triggerModalShow}, ref) => {
    // const { modalOut } = props; 
    const [data, setData] = useState<rowData[]>(DATA);
    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);

    useImperativeHandle(ref, () => ({
        triggerExport: () => {
            setExportData(exportData => !exportData);
            console.log(exportData);
        }
    }), [])
    type rowData = {
        "no": number,
        "type": string;
        "identity": string;
        "number": number;
        "photo_n": number;
        "all": number;
        "pass_a": number;
        "pass_s": number;
    }
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "no",
            header: "No.",
            cell: (props: any) => <p>{props.row.index + 1}</p>
        }
        ,
        {
            accessorKey: "type",
            header: "報名種類",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "identity",
            header: "身份",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "number",
            header: "報名人數",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "photo_n",
            header: "未傳照片",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "all",
            header: "全測",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "pass_a",
            header: "免學",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "pass_s",
            header: "免術",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        // ,
        // {

        //     accessorKey: "pass_s",
        //     header: "",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    console.log(data);
    return (
        <div className="tableContainer">
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
                                    <div className="iconEye" onClick={triggerModalShow}>
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
})
export default DataTable;
