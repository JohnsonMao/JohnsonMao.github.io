import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'markdown', 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        const matterResult = matter(fileContents)
        const post: Post = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date
        }

        return post
    })

    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}
