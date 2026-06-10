export const formatPhoneMask = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  if (!digits) return ''
  return `+${digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim()}`
}
