'use client';

import { useRouter } from 'next/navigation';

type TableProps = {
  columns: string[];
  data: any[];
};

export default function Table({ columns, data }: TableProps) {
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/timesheet-details?id=${id}`); 
    
  };

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="border p-2">{col}</th>
          ))}
          <th className="border p-2">Action</th> {/* New column */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((col, i) => (
              <td key={i} className="border p-2">{row[col.toLowerCase()]}</td>
            ))}
            <td
              className="border p-2 text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleView(row.id)}
            >
              View
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
