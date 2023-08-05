const config: IConfig = {
  meta: {
    title: '毛毛筆記',
    description: '這是毛毛的筆記網站',
    authors: [
      {
        name: 'Johnson Mao',
        url: 'https://github.com/JohnsonMao',
      },
    ],
  },
  navbar: {
    title: '毛毛筆記',
    menu: [
      { title: '首頁', url: '/' },
      { title: '封存', url: '/' },
      { title: '類別', url: '/' },
      { title: '標籤', url: '/' },
      { title: '關於', url: '/' },
    ],
  },
  banner: {
    title: '每天都要超越昨天的自己！',
  },
};

export interface IAuthor {
  readonly name: string;
  readonly url: string;
}

export interface IMeta {
  readonly title: string;
  readonly description: string;
  readonly authors: IAuthor[];
}

export interface INavbarLink {
  readonly title: string;
  readonly url: `/${string}`;
}

export interface INavbar {
  readonly title: string;
  readonly menu: INavbarLink[];
}

export interface IBanner {
  readonly title: string;
}

export interface IConfig {
  readonly meta: IMeta;
  readonly navbar: INavbar;
  readonly banner: IBanner;
}

export default config;
