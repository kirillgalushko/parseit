export function trimAroundSubstring(text, substring, wordsBefore = 3, wordsAfter = 3) {
  if (!substring) return null
  const words = text.split(/\s+/)
  const index = words.findIndex((word) => word.includes(substring))

  if (index === -1) return null

  const start = Math.max(0, index - wordsBefore)
  const end = Math.min(words.length, index + wordsAfter + 1)

  return words.slice(start, end).join(' ')
}
