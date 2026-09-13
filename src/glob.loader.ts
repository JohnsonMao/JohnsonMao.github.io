export type I18nMessageModules = Record<string, { default: unknown }>

export function getMessageModules(): I18nMessageModules {
  return import.meta.glob<{ default: unknown }>('./i18n/messages/*/*.json', { eager: true })
}
