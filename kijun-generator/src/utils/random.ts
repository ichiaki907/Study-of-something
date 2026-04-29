export function pickRandom<T>(items: T[], exclude?: (item: T) => boolean): T | null {
  if (items.length === 0) return null;
  const filtered = exclude ? items.filter((item) => !exclude(item)) : items;
  const pool = filtered.length > 0 ? filtered : items;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}

export function pickRandomMany<T>(items: T[], count: number): T[] {
  if (items.length === 0 || count <= 0) return [];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}
