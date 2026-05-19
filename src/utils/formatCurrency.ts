export function formatCurrency(amount: number): string {
  const formatted = amount.toLocaleString('en-IN')
  return `₹ ${formatted}`
}

export function formatPriceShort(amount: number): string {
  if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(2)} L`
  return formatCurrency(amount)
}
