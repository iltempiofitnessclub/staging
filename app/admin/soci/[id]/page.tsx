import SocioEditPage from '@/components/admin/soci/SocioEditPage';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return <SocioEditPage socioId={params.id} />;
}
