import { describe, expect, it } from 'vitest'
import { buildShareUrl } from './share'

const TITLE = 'My Test Post'
const URL = 'https://example.com/blog/my-test-post'

describe('buildShareUrl()', () => {
  it('twitter/X: includes encoded title and url as separate params', () => {
    const result = buildShareUrl('twitter', TITLE, URL)
    expect(result).toBe(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(TITLE)}&url=${encodeURIComponent(URL)}`,
    )
  })

  it('threads: combines title and url in a single text param', () => {
    const result = buildShareUrl('threads', TITLE, URL)
    expect(result).toBe(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(`${TITLE} ${URL}`)}`,
    )
  })

  it('facebook: passes only url as u param', () => {
    const result = buildShareUrl('facebook', TITLE, URL)
    expect(result).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL)}`,
    )
  })

  it('linkedIn: passes only url as url param', () => {
    const result = buildShareUrl('linkedin', TITLE, URL)
    expect(result).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`,
    )
  })

  it('lINE: passes only url as url param', () => {
    const result = buildShareUrl('line', TITLE, URL)
    expect(result).toBe(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(URL)}`,
    )
  })

  it('encodes special characters in title', () => {
    const specialTitle = 'Post: "Hello & World"'
    const result = buildShareUrl('twitter', specialTitle, URL)
    expect(result).toContain(`text=${encodeURIComponent(specialTitle)}`)
  })
})
