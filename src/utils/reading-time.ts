/**
 * Estimate reading time from content (markdown or plain text).
 * Strips markdown syntax and counts characters; divides by locale-specific WPM.
 */

import type { Locale } from '@/i18n'

const CHARS_PER_MINUTE_ZH = 220
const CHARS_PER_MINUTE_EN = 280

const codeBlockRegex = /```[\s\S]*?```/g
const inlineCodeRegex = /`[^`]+`/g
const headerRegex = /#{1,6}\s/g
const boldMarkdownRegex = /\*\*?[^*]+\*\*?/g
const italicMarkdownRegex = /__?[^_]+__?/g
const linkMarkdownRegex = /\[([^\]]+)\]\([^)]+\)/g
const unorderedListRegex = /^[-*+]\s/gm
const orderedListRegex = /^\d+\.\s/gm
const newlineRegex = /\n+/g

/**
 * Strip markdown-style formatting to approximate plain text length.
 */
function stripMarkdown(content: string): string {
  return content
    .replace(codeBlockRegex, ' ')
    .replace(inlineCodeRegex, ' ')
    .replace(headerRegex, ' ')
    .replace(boldMarkdownRegex, ' ')
    .replace(italicMarkdownRegex, ' ')
    .replace(linkMarkdownRegex, '$1')
    .replace(unorderedListRegex, ' ')
    .replace(orderedListRegex, ' ')
    .replace(newlineRegex, ' ')
    .trim()
}

export interface ReadingTimeResult {
  minutes: number
  label: string
}

/**
 * Get estimated reading time in minutes. Rounds up; returns at least 1 for non-empty content.
 * @param content - Raw markdown or plain text
 * @param locale - Optional locale for WPM (future use); currently uses unified default
 */
export function getReadingTimeMinutes(
  content: string,
  locale?: Locale,
): number {
  const text = stripMarkdown(content)
  const len = text.length
  if (len === 0)
    return 0
  const wpm = locale === 'en' ? CHARS_PER_MINUTE_EN : CHARS_PER_MINUTE_ZH
  return Math.max(1, Math.ceil(len / wpm))
}

/**
 * Get reading time with a display label (e.g. "約 5 分鐘" / "5 min read").
 */
export function getReadingTime(content: string, locale: Locale): ReadingTimeResult {
  const minutes = getReadingTimeMinutes(content, locale)
  const label = (locale ?? 'zh-TW') === 'en' ? `${minutes} min read` : `約 ${minutes} 分鐘`
  return { minutes, label }
}
