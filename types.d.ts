type Post = {
	title: string;
	date: string | Date;
	index_img: string;
	banner_img: string;
	categories: string[][];
	tags: string[];
	excerpt: string;
};

type Settings = {
	title: string;
}
