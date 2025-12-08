"use client";

import React from "react";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login amministrazione</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="nome@esempio.it"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-md text-sm font-semibold border"
          >
            Accedi
          </button>
        </form>
      </div>
    </main>
  );
}
