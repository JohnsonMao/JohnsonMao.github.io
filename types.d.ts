type IPost = {
  title: string;
  date: string | Date;
  index_img: string;
  banner_img: string;
  categories: string[][];
  tags: string[];
  excerpt: string;
};

type IAuthor = {
  name: string;
  url: string;
};

type IMeta = {
  title: string;
  description: string;
  authors: IAuthor[];
};

type INavbarLink = {
  title: string;
  url: string;
};

type INavbar = {
  title: string;
  menu: INavbarLink[];
};

type IBanner = {
  title: string;
};

type ISettings = {
  meta: IMeta;
  navbar: INavbar;
  banner: IBanner;
};
