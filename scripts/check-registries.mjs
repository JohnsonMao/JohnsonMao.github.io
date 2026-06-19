import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')

function loadRegistry(jsonPath) {
  const content = JSON.parse(readFileSync(jsonPath, 'utf-8'))
  return new Set(Object.keys(content.registry ?? {}))
}

function walkFiles(dir, exts = ['.md', '.mdx']) {
  const files = []
  let entries
  try {
    entries = readdirSync(dir)
  }
  catch {
    return files
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...walkFiles(fullPath, exts))
    }
    else if (exts.some(ext => entry.endsWith(ext))) {
      files.push(fullPath)
    }
  }
  return files
}

const tagsRegistry = loadRegistry(join(ROOT, 'src/i18n/messages/zh-TW/tags.json'))
const seriesRegistry = loadRegistry(join(ROOT, 'src/i18n/messages/zh-TW/series.json'))

const contentDirs = [
  join(ROOT, 'src/content/blog'),
  join(ROOT, 'src/content/til'),
  join(ROOT, 'src/content/notes'),
]

const allFiles = contentDirs.flatMap(dir => walkFiles(dir))

/** @type {Map<string, string[]>} */
const missingTags = new Map()
/** @type {Map<string, string[]>} */
const missingSeries = new Map()

const allTagValues = new Set()
const allSeriesValues = new Set()

for (const filePath of allFiles) {
  const raw = readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  const relativePath = filePath.replace(`${ROOT}/`, '')

  if (Array.isArray(data.tags)) {
    for (const tag of data.tags) {
      allTagValues.add(tag)
      if (!tagsRegistry.has(tag)) {
        if (!missingTags.has(tag))
          missingTags.set(tag, [])
        missingTags.get(tag).push(relativePath)
      }
    }
  }

  if (typeof data.series === 'string') {
    allSeriesValues.add(data.series)
    if (!seriesRegistry.has(data.series)) {
      if (!missingSeries.has(data.series))
        missingSeries.set(data.series, [])
      missingSeries.get(data.series).push(relativePath)
    }
  }
}

if (missingTags.size === 0 && missingSeries.size === 0) {
  console.log(`✓ ${tagsRegistry.size} tags, ${seriesRegistry.size} series — all registry entries present.`)
  process.exit(0)
}

if (missingTags.size > 0) {
  console.log('Missing tag registry entries in zh-TW:')
  for (const [tag, files] of missingTags) {
    console.log(`  "${tag}"`)
    for (const f of files) {
      console.log(`    ${f}`)
    }
  }
  console.log()
}

if (missingSeries.size > 0) {
  console.log('Missing series registry entries in zh-TW:')
  for (const [seriesId, files] of missingSeries) {
    console.log(`  "${seriesId}"`)
    for (const f of files) {
      console.log(`    ${f}`)
    }
  }
  console.log()
}

console.log('→ Add missing entries to the corresponding i18n registry files.')
process.exit(1)
