export function getCategories<T extends { category: string }>(items: T[]): string[] {
  return ['すべて', ...new Set(items.map((item) => item.category))];
}

export function filterBySearchAndCategory<T extends { text: string; category: string }>(items: T[], searchText: string, category: string): T[] {
  const normalized = searchText.trim().toLowerCase();
  return items.filter((item) => {
    const hitCategory = category === 'すべて' || item.category === category;
    const hitText = normalized.length === 0 || item.text.toLowerCase().includes(normalized);
    return hitCategory && hitText;
  });
}
