'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Timesheet = {
  id: number;
  date: string;
  status: string;
};

export default function TimesheetDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<Timesheet | null>(null);

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        const res = await fetch(`/api/timesheets/${id}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      };
      fetchDetails();
    }
  }, [id]);

  if (!id) return <p className="p-6 text-center">Invalid ID</p>;
  if (!data) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Timesheet Details</h1>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Status:</strong> {data.status}</p>
    </div>
  );
}
