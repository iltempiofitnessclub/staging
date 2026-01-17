import SocioForm from '@/components/admin/soci/SocioForm';

export default function SocioDetailPage({ params }: { params: { id: string } }) {
  const fakeData = {
    id: params.id,
    nome: 'Mario',
    cognome: 'Rossi',
    telefono: '3331234567',
    email: 'mario.rossi@email.it',
    codiceFiscale: 'RSSMRA80A01A662B'
  };

  return <SocioForm mode="edit" initialData={fakeData} />;
}
