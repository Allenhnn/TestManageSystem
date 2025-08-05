import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, GlobalFiltering } from "@tanstack/react-table";
import DATA from "../json/codeTemplate.json";
import { forwardRef, useState, useImperativeHandle } from "react";
type globalType = {
    handleResult: (arg:number)=>void;
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

type rowData = {
    "type-code": string
}

// type json_type = {
//     [key : string]
// }
// higher order function only receive two arguments , props needs to become a set.
// const ViewTable :React.FC<json_type> = (init_data) => {
const CodeTableSearchContainer = ({ handleResult, globalFilter, setGlobalFilter }: globalType) => {
    // const { modalOut } = props; 
    const [data, setData] = useState<rowData[]>(DATA);
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
            accessorKey: "type-code",
            header: "類別",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
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
    ]

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    console.log(data);
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
                                <div className="iconEye" onClick={() => {handleResult(Number(row.id)) }}>
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default CodeTableSearchContainer;
