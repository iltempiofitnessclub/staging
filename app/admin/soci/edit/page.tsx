import { Suspense } from 'react';
import EditSocioClient from './EditSocioClient';

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20, fontWeight: 700 }}>Caricamento...</div>}>
      <EditSocioClient />
    </Suspense>
  );
}
