import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

const postsDirectory = path.join(process.cwd(), 'markdown', 'posts');

export async function getSortedPostList() {
	const fileNames = fs.readdirSync(postsDirectory);
	const idSet = new Set();
	const allPostsData = await Promise.all(
		fileNames.map(async (fileName) => {
			const id = fileName.replace(/\.mdx?$/, '');

			if (idSet.has(id)) {
				throw new Error(`Duplicate id "${id}" found in "${fileName}"`);
			}
			idSet.add(id);

			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { frontmatter } = await compileMDX<Post>({
				source: fileContents,
				options: {
					parseFrontmatter: true,
				},
			});

			return {
				id,
				...frontmatter,
			};
		})
	);

	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
	const mdxPath = path.join(postsDirectory, `${id}.mdx`);
	const mdPath = path.join(postsDirectory, `${id}.md`);
	const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { content, frontmatter } = await compileMDX<Post>({
		source: fileContents,
		components: {
			h1: (props) => <h2 {...props} />,
		},
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeCodeTitles, rehypePrismPlus],
			},
		},
	});

	return { id, content, frontmatter };
}
