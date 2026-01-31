const MONTHS = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE'
] as const;

export function quotaToPaymentDateIso(quotaMese: string, quotaAnno: string) {
  const monthIndex = MONTHS.indexOf(String(quotaMese ?? '').trim().toUpperCase() as any);
  if (monthIndex < 0) return null;

  const yearNum = Number(quotaAnno);
  if (!Number.isFinite(yearNum) || yearNum < 1900) return null;

  const mm = String(monthIndex + 1).padStart(2, '0');
  return `${yearNum}-${mm}-01`; // ISO date: YYYY-MM-01
}
