export type I18nMessageModules = Record<string, { default: unknown }>

export type TagTranslations = Record<string, {
  name: string
  description: string
}>

export type TagTranslationModules = Record<string, { default: TagTranslations }>

export function getMessageModules(): I18nMessageModules {
  return import.meta.glob<{ default: unknown }>('./i18n/messages/*/*.json', { eager: true })
}

export function getTagTranslationModules(): TagTranslationModules {
  return import.meta.glob<{ default: TagTranslations }>('./i18n/tags/*.json', { eager: true })
}
