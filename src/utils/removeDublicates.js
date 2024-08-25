export function removeDuplicateByProfit(arr) {
  const seen = new Set();
  return arr.filter((item) => {
    const duplicate = seen.has(item.profit);
    seen.add(item.profit);
    return !duplicate;
  });
}
