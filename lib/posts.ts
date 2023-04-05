import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

const postsDirectory = path.join(process.cwd(), 'markdown', 'posts');

export function getSortedPostList() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const matterResult = matter(fileContents);

		return {
			id,
			...(matterResult.data as Omit<Post, 'id'>),
		};
	});

	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { content, frontmatter } = await compileMDX<Post>({
		source: fileContents,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypePrismPlus, rehypeCodeTitles],
			}
		}
	})

	return { id, content, frontmatter };
}
