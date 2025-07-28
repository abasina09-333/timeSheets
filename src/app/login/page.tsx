'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-6">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2"
                />
                Remember me
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6 text-center">© 2025 TickTock</p>
        </div>
      </div>

      {/* Right Side: Branding */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4">ticktock</h2>
          <p className="text-lg leading-relaxed">
            Introducing TickTock, the cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With TickTock, you can effortlessly track and monitor employee attendance and productivity.
          </p>
        </div>
      </div>
    </div>
  );
}
