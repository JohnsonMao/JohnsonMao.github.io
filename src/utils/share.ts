export type Platform = 'twitter' | 'threads' | 'facebook' | 'linkedin' | 'line'

export function buildShareUrl(platform: Platform, title: string, url: string): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    case 'threads':
      return `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${url}`)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'line':
      return `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
  }
}
