"use client"
import React from "react";
import { useReactTable, createColumnHelper, getCoreRowModel,flexRender, getSortedRowModel} from "@tanstack/react-table";
import mockData from "@/data/data.json"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";

const columnsHelper = createColumnHelper();

const columns = [
  columnsHelper.accessor("id", {
    cell:(info)=>info.getValue(), 
    header: ()=>(
      <span className="flex items-center">
        <User size={16}/>Id
      </span>
    )
  }), 
  columnsHelper.accessor("name", {
    cell: (info)=>info.getValue(), 
    header:()=>(
      <span className="flex items-center">
        <User size={16} />Name
      </span>
    )
  }), 
  columnsHelper.accessor("email", {
    cell: (info)=>(
      <span className="italic text-blue-600">{info.getValue()}</span>
    ), 
    header:()=>(
      <span className="flex items-center">
        <User size={16}/>E-mail
      </span>
    )
  }), 
  columnsHelper.accessor("phone", {
    cell: (info)=>(
      <span className="">{info.getValue()}</span>
    ), 
    header:()=>(
      <span className="flex items-center">
        <User size={16}/>Phone
      </span>
    )
  }),
]
export default function Home() {
  const [data] = React.useState(()=>[...mockData])
  const[sorting, setSorting] = React.useState([]); 
  const table = useReactTable({
    data, 
    columns, 
    state:{sorting},
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting, 
    getSortedRowModel: getSortedRowModel(),
  })
  console.log(table.getRowModel())
  return (
   <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup)=>(
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header)=>(
                  <th key={header.id}>
                    <div {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {
                        flexRender(
                          header.column.columnDef.header, 
                          header.getContext()
                        )
                      }
                      <ArrowUpDown className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row)=>(
              <tr key={row.id}>
                {
                  row.getVisibleCells().map((cell)=>(
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </div>
  );
}
