'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  date: string;
  taskName: string;
  hours: number;
  status: 'Submitted' | 'Pending';
};

export default function TimesheetDetailPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) router.push('/login');

    const fetchData = async () => {
      const res = await fetch('/api/timesheet-details');
      const result = await res.json();
      setTasks(result);
    };

    fetchData();
  }, []);

  const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);

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
        <div className="bg-white shadow rounded p-6 max-w-5xl mx-auto">
          {/* Title and total hours */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">This week’s timesheet</h2>
              <p className="text-gray-500 text-sm">21 - 26 January, 2024</p>
            </div>
            <div className="text-blue-600 font-semibold">{totalHours} Hrs</div>
          </div>

          {/* Timesheet List */}
          <div className="space-y-3">
            {tasks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded px-4 py-3 hover:bg-gray-50"
              >
                {/* Left: Date + Task */}
                <div>
                  <p className="text-gray-700 font-medium">{item.date}</p>
                  <p className="text-gray-500 text-sm">{item.taskName}</p>
                </div>

                {/* Add Task Button */}
                <button className="text-blue-600 hover:underline text-sm">
                  + Add new task
                </button>

                {/* Hours */}
                <div className="text-gray-600">{item.hours} hrs</div>

                {/* Status */}
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    item.status === 'Submitted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4">
        © 2025 TickTock. All Rights Reserved.
      </footer>
    </div>
  );
}
