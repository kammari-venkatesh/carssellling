export function calculateEMI(principal: number, annualRate: number, months: number): number {
  if (months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

export function estimateMonthlyEMI(price: number, downPercent = 20, rate = 9.5, years = 5): number {
  const principal = price * (1 - downPercent / 100)
  return Math.round(calculateEMI(principal, rate, years * 12))
}
