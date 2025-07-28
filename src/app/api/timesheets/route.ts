import { NextResponse } from 'next/server';

const timesheets = [
  { id: 1, date: '1-7 January, 2024', status: 'COMPLETE' },
  { id: 2, date: '8-14 January, 2024', status: 'COMPLETE' },
  { id: 3, date: '15-21 January, 2024', status: 'INCOMPLETE' },
  { id: 4, date: '22-28 January, 2024', status: 'COMPLETE' },
  { id: 5, date: '29 January - 4 February, 2024', status: 'MISSING' },
];

export async function GET() {
  return NextResponse.json(timesheets);
}
