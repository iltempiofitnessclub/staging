"use client";

import React from "react";

type Socio = {
  id: number;
  nome: string;
  stato: "Attivo" | "Scaduto";
};

const SOCI_FAKE: Socio[] = [
  { id: 1, nome: "Mario Rossi", stato: "Attivo" },
  { id: 2, nome: "Giulia Bianchi", stato: "Scaduto" },
];

export default function AdminSociPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Gestione soci</h1>

      <p className="text-sm text-gray-600 mb-4">
        Questa è una tabella di esempio. In seguito la collegherai ai dati reali.
      </p>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">Stato</th>
            </tr>
          </thead>
          <tbody>
            {SOCI_FAKE.map((socio) => (
              <tr key={socio.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{socio.id}</td>
                <td className="px-4 py-2">{socio.nome}</td>
                <td className="px-4 py-2">{socio.stato}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
