export function trimAroundSubstring(
  text: string,
  substring: string,
  wordsBefore = 3,
  wordsAfter = 3
) {
  if (!substring) return null
  const words = text.split(/\s+/)

  const lowerCaseSubstring = substring.toLowerCase()
  const index = words.findIndex((word) => word.toLowerCase().includes(lowerCaseSubstring))

  if (index === -1) return null

  const start = Math.max(0, index - wordsBefore)
  const end = Math.min(words.length, index + wordsAfter + 1)

  return words.slice(start, end).join(' ')
}
