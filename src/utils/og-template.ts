export interface OgCardProps {
  title: string
  description?: string
  tags?: string[]
  pubDate: Date
  locale: string
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text
}

function formatDate(date: Date, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date)
  } catch {
    return new Intl.DateTimeFormat('zh-TW', { dateStyle: 'long' }).format(date)
  }
}

/**
 * Builds the Satori element tree for the OG image card.
 * Layout: 1200×630px dark card with a blue left accent bar.
 *
 * ┌─[8px blue]─────────────────────────────────────────────────┐
 * │  JohnsonMao's Blog                                         │
 * │                                                            │
 * │  {title}                                (64px bold white)  │
 * │  {description}                          (28px muted grey)  │
 * │                                                            │
 * │  #tag1  #tag2  #tag3         {date}  johnsonmao.github.io  │
 * └────────────────────────────────────────────────────────────┘
 */
export function buildOgCard({ title, description, tags = [], pubDate, locale }: OgCardProps) {
  const visibleTags = tags.slice(0, 3)
  const formattedDate = formatDate(pubDate, locale)

  return {
    type: 'div',
    key: null,
    props: {
      style: {
        display: 'flex',
        width: 1200,
        height: 630,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: '"Noto Sans TC", sans-serif',
        position: 'relative',
      },
      children: [
        // Left accent bar
        {
          type: 'div',
          key: null,
          props: {
            style: {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 8,
              background: '#2563eb',
            },
            children: null,
          },
        },
        // Main content column
        {
          type: 'div',
          key: null,
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              padding: '56px 80px 56px 88px',
              width: '100%',
              height: '100%',
              gap: 0,
            },
            children: [
              // Top: blog name
              {
                type: 'div',
                key: null,
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: {
                    type: 'span',
                    key: null,
                    props: {
                      style: {
                        color: '#64748b',
                        fontSize: 24,
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                      },
                      children: "JohnsonMao's Blog",
                    },
                  },
                },
              },
              // Middle: title + description (flex-1 to push bottom to end)
              {
                type: 'div',
                key: null,
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 24,
                    flexGrow: 1,
                    paddingTop: 8,
                    paddingBottom: 8,
                  },
                  children: [
                    // Title
                    {
                      type: 'div',
                      key: null,
                      props: {
                        style: {
                          color: '#f1f5f9',
                          fontSize: 64,
                          fontWeight: 700,
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                        },
                        children: truncate(title, 58),
                      },
                    },
                    // Description (optional)
                    ...(description
                      ? [
                          {
                            type: 'div',
                            key: null,
                            props: {
                              style: {
                                color: '#94a3b8',
                                fontSize: 28,
                                fontWeight: 400,
                                lineHeight: 1.5,
                              },
                              children: truncate(description, 75),
                            },
                          },
                        ]
                      : []),
                  ],
                },
              },
              // Bottom: tags + site info
              {
                type: 'div',
                key: null,
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  },
                  children: [
                    // Tag badges
                    {
                      type: 'div',
                      key: null,
                      props: {
                        style: { display: 'flex', gap: 10 },
                        children:
                          visibleTags.length > 0
                            ? visibleTags.map((tag) => ({
                                type: 'span',
                                key: tag,
                                props: {
                                  style: {
                                    background: 'rgba(37, 99, 235, 0.2)',
                                    color: '#93c5fd',
                                    fontSize: 20,
                                    fontWeight: 500,
                                    padding: '5px 14px',
                                    borderRadius: 999,
                                    border: '1px solid rgba(37, 99, 235, 0.5)',
                                  },
                                  children: `#${tag}`,
                                },
                              }))
                            : { type: 'span', key: null, props: { style: {}, children: '' } },
                      },
                    },
                    // Date + URL
                    {
                      type: 'div',
                      key: null,
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 4,
                        },
                        children: [
                          {
                            type: 'span',
                            key: null,
                            props: {
                              style: { color: '#475569', fontSize: 20 },
                              children: formattedDate,
                            },
                          },
                          {
                            type: 'span',
                            key: null,
                            props: {
                              style: {
                                color: '#2563eb',
                                fontSize: 20,
                                fontWeight: 500,
                              },
                              children: 'johnsonmao.github.io',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}
