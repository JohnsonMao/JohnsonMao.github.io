import { describe, expect, it } from 'vitest'
import { buildOgCard, type OgCardProps } from './og-template'

const baseProps: OgCardProps = {
  title: 'Hello World',
  pubDate: new Date('2024-01-15'),
  locale: 'zh-TW',
}

describe('buildOgCard()', () => {
  it('returns a div element tree', () => {
    const card = buildOgCard(baseProps)
    expect(card.type).toBe('div')
    expect(card.props.children).toBeInstanceOf(Array)
  })

  it('includes the formatted date in the output', () => {
    const card = buildOgCard(baseProps)
    const json = JSON.stringify(card)
    // The date should appear somewhere in the rendered output
    expect(json).toContain('2024')
  })

  it('includes the title in the output', () => {
    const card = buildOgCard(baseProps)
    const json = JSON.stringify(card)
    expect(json).toContain('Hello World')
  })

  it('truncates long titles to 58 characters', () => {
    const longTitle = 'A'.repeat(100)
    const card = buildOgCard({ ...baseProps, title: longTitle })
    const json = JSON.stringify(card)
    // truncated title ends with ellipsis character
    expect(json).toContain('…')
    expect(json).not.toContain(longTitle)
  })

  it('does not truncate short titles', () => {
    const shortTitle = 'Short'
    const card = buildOgCard({ ...baseProps, title: shortTitle })
    const json = JSON.stringify(card)
    expect(json).toContain(shortTitle)
    expect(json).not.toContain('…')
  })

  it('includes description when provided', () => {
    const card = buildOgCard({ ...baseProps, description: 'My description text' })
    const json = JSON.stringify(card)
    expect(json).toContain('My description text')
  })

  it('truncates long descriptions to 75 characters', () => {
    const longDesc = 'D'.repeat(100)
    const card = buildOgCard({ ...baseProps, description: longDesc })
    const json = JSON.stringify(card)
    expect(json).toContain('…')
  })

  it('omits description element when not provided', () => {
    const cardWithDesc = buildOgCard({ ...baseProps, description: 'has desc' })
    const cardWithout = buildOgCard({ ...baseProps })
    const jsonWith = JSON.stringify(cardWithDesc)
    const jsonWithout = JSON.stringify(cardWithout)
    expect(jsonWith).toContain('has desc')
    expect(jsonWithout).not.toContain('has desc')
  })

  it('renders up to 3 tags with # prefix', () => {
    const tags = ['javascript', 'typescript', 'react', 'vue']
    const card = buildOgCard({ ...baseProps, tags })
    const json = JSON.stringify(card)
    expect(json).toContain('#javascript')
    expect(json).toContain('#typescript')
    expect(json).toContain('#react')
    // 4th tag should be omitted
    expect(json).not.toContain('#vue')
  })

  it('renders empty tag placeholder when no tags provided', () => {
    const card = buildOgCard({ ...baseProps, tags: [] })
    const json = JSON.stringify(card)
    // Tag badge children look like `"children":"#tagname"`, CSS colors appear inside style objects.
    // Verify no tag badge children are present.
    expect(json).not.toContain('"children":"#')
  })

  it('defaults tags to empty array when not provided', () => {
    expect(() => buildOgCard(baseProps)).not.toThrow()
  })

  it('includes site URL in output', () => {
    const card = buildOgCard(baseProps)
    const json = JSON.stringify(card)
    expect(json).toContain('johnsonmao.github.io')
  })

  it('includes blog name in output', () => {
    const card = buildOgCard(baseProps)
    const json = JSON.stringify(card)
    expect(json).toContain("JohnsonMao's Blog")
  })

  it('uses fallback locale when locale causes Intl.DateTimeFormat to throw', () => {
    // '123' starts with a digit — not valid BCP47, Intl.DateTimeFormat throws RangeError
    // The catch branch in formatDate falls back to zh-TW formatting
    expect(() => buildOgCard({ ...baseProps, locale: '123' })).not.toThrow()
    const card = buildOgCard({ ...baseProps, locale: '123' })
    // Verify the card still contains a date (zh-TW fallback was used)
    expect(JSON.stringify(card)).toContain('2024')
  })

  it('formats date with en locale', () => {
    const card = buildOgCard({ ...baseProps, locale: 'en' })
    const json = JSON.stringify(card)
    // en locale should format date differently, but still include the year
    expect(json).toContain('2024')
  })
})
