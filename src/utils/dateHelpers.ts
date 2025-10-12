export const formatDateKey = (d: Date) => {
  return d.toISOString().slice(0, 10); // yyyy-mm-dd
};

export const toISODate = (s: string) => new Date(s).toISOString().slice(0, 10);
