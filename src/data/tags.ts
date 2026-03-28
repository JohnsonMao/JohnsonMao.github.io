import type { Locale } from '@/i18n'

export const tags = {
  'astro': {
    name: {
      'zh-TW': 'Astro',
      'en': 'Astro',
    },
    description: {
      'zh-TW': '關於 Astro 框架的開發心得、技巧與實戰經驗。',
      'en': 'Development tips, tricks, and real-world experiences with the Astro framework.',
    },
  },
  'i18n': {
    name: {
      'zh-TW': '多語系',
      'en': 'i18n',
    },
    description: {
      'zh-TW': '探討如何實作網站多語系支援 (i18n)，包括內容翻譯、路由與 SEO 優化。',
      'en': 'Exploring how to implement internationalization (i18n) for websites, including content translation, routing, and SEO optimization.',
    },
  },
  'test': {
    name: {
      'zh-TW': '測試',
      'en': 'Test',
    },
    description: {
      'zh-TW': '軟體測試相關技術，包括單元測試、整合測試與自動化測試工具的使用。',
      'en': 'Software testing techniques, including unit testing, integration testing, and the use of automated testing tools.',
    },
  },
  'demo': {
    name: {
      'zh-TW': '示範',
      'en': 'Demo',
    },
    description: {
      'zh-TW': '各種功能或技術的示範專案與程式碼範例。',
      'en': 'Demonstration projects and code examples for various features or technologies.',
    },
  },
  'intro': {
    name: {
      'zh-TW': '介紹',
      'en': 'Introduction',
    },
    description: {
      'zh-TW': '針對特定技術、工具或專案的入門介紹。',
      'en': 'Introductory guides to specific technologies, tools, or projects.',
    },
  },
  'fallback': {
    name: {
      'zh-TW': '回退機制',
      'en': 'Fallback',
    },
    description: {
      'zh-TW': '探討在內容缺失或錯誤發生時的自動回退處理機制。',
      'en': 'Exploring automatic fallback mechanisms when content is missing or errors occur.',
    },
  },
  'react': {
    name: {
      'zh-TW': 'React',
      'en': 'React',
    },
    description: {
      'zh-TW': 'React.js 框架相關技術探討。',
      'en': 'Discussions on React.js framework technologies.',
    },
  },
  'hexschool': {
    name: {
      'zh-TW': '六角學院',
      'en': 'Hexschool',
    },
    description: {
      'zh-TW': '六角學院課程筆記與活動紀錄。',
      'en': 'Course notes and activity records from Hexschool.',
    },
  },
  'vue3-camp': {
    name: {
      'zh-TW': 'Vue 3 新手夏令營',
      'en': 'Vue 3 Beginner Camp',
    },
    description: {
      'zh-TW': 'Vue 3 新手夏令營學習心得與任務紀錄。',
      'en': 'Learning experiences and task records from Vue 3 Beginner Camp.',
    },
  },
  'mongodb': {
    name: {
      'zh-TW': 'MongoDB',
      'en': 'MongoDB',
    },
    description: {
      'zh-TW': 'MongoDB 資料庫操作與應用。',
      'en': 'MongoDB database operations and applications.',
    },
  },
  'it-ironman': {
    name: {
      'zh-TW': 'iT 鐵人賽',
      'en': 'iT Ironman',
    },
    description: {
      'zh-TW': 'iT 邦幫忙鐵人賽參賽文章紀錄。',
      'en': 'Articles recorded from the iT Help Ironman competition.',
    },
  },
  'vscode': {
    name: {
      'zh-TW': 'VS Code',
      'en': 'VS Code',
    },
    description: {
      'zh-TW': 'Visual Studio Code 編輯器技巧與外掛推薦。',
      'en': 'Tips and plugin recommendations for Visual Studio Code.',
    },
  },
  'html': {
    name: {
      'zh-TW': 'HTML',
      'en': 'HTML',
    },
    description: {
      'zh-TW': 'HTML 標記語言相關知識。',
      'en': 'Knowledge related to HTML markup language.',
    },
  },
  'css': {
    name: {
      'zh-TW': 'CSS',
      'en': 'CSS',
    },
    description: {
      'zh-TW': 'CSS 網頁樣式設計與技巧。',
      'en': 'Web styling design and techniques with CSS.',
    },
  },
  'javascript': {
    name: {
      'zh-TW': 'JavaScript',
      'en': 'JavaScript',
    },
    description: {
      'zh-TW': 'JavaScript 核心概念與實戰應用。',
      'en': 'Core concepts and practical applications of JavaScript.',
    },
  },
  'jsdc': {
    name: {
      'zh-TW': 'JSDC',
      'en': 'JSDC',
    },
    description: {
      'zh-TW': 'JSDC (JavaScript Developer Conference) 研討會紀錄。',
      'en': 'Records from the JavaScript Developer Conference (JSDC).',
    },
  },
  'typescript': {
    name: {
      'zh-TW': 'TypeScript',
      'en': 'TypeScript',
    },
    description: {
      'zh-TW': 'TypeScript 靜態型別開發經驗分享。',
      'en': 'Sharing experiences with TypeScript static typing development.',
    },
  },
} as const

export type TagId = keyof typeof tags

/**
 * 取得翻譯後的標籤名稱
 */
export function getTagDisplay(tagId: TagId, locale: Locale): string {
  const tag = tags[tagId]
  if (!tag)
    return tagId

  const nameObj = (tag as any).name
  if (!nameObj)
    return tagId

  return nameObj[locale] || nameObj['zh-TW'] || nameObj.en || Object.values(nameObj)[0] || tagId
}

/**
 * 取得翻譯後的標籤描述
 */
export function getTagDescription(tagId: TagId, locale: Locale): string | undefined {
  const tag = tags[tagId]
  if (!tag || !tag.description)
    return undefined
  return tag.description[locale] || Object.values(tag.description)[0]
}
