'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Timesheet = {
  id: number;
  date: string;
  status: 'COMPLETE' | 'INCOMPLETE' | 'MISSING';
};

const statusColors: Record<string, string> = {
  COMPLETE: 'bg-green-100 text-green-700',
  INCOMPLETE: 'bg-yellow-100 text-yellow-700',
  MISSING: 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  const [data, setData] = useState<Timesheet[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) router.push('/login');

    const fetchData = async () => {
      try {
        const res = await fetch('/api/timesheets');
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Failed to load timesheets:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleActionClick = (id: number) => {
    router.push(`/timesheet-details?id=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">ticktock</h1>
        <nav className="text-gray-600 font-medium">Timesheets</nav>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">John Doe</span>
          <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 p-6">
        <div className="bg-white shadow rounded p-4 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Your Timesheets</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{item.date}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleActionClick(item.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {item.status === 'COMPLETE'
                        ? 'View'
                        : item.status === 'INCOMPLETE'
                        ? 'Update'
                        : 'Create'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4">
        © 2025 TickTock. All Rights Reserved.
      </footer>
    </div>
  );
}
