import { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20, fontWeight: 700 }}>Caricamento...</div>}>
      <LoginClient />
    </Suspense>
  );
}
