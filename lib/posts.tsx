import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'markdown', 'posts');

export function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf-8');
		const { data } = matter(fileContents);
		const post: Post = {
			id,
			title: data.title,
			date: data.date,
		};

		return post;
	});

	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf-8');
	const { data, content } = matter(fileContents);
	const processedContent = await remark().use(html).process(content);
	const contentHtml = processedContent.toString();
	const postWithHtml: Post & { contentHtml: string } = {
		id,
		title: data.title,
		date: data.date,
		contentHtml,
	};

	return postWithHtml;
}
