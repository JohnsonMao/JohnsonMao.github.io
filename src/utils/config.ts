import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const configDirectory = path.join(process.cwd(), 'config.yml');

export interface IAuthor {
  name: string;
  url: string;
};

export interface IMeta {
  title: string;
  description: string;
  authors: IAuthor[];
};

export interface INavbarLink {
  title: string;
  url: string;
};

export interface INavbar {
  title: string;
  menu: INavbarLink[];
};

export interface IBanner {
  title: string;
};

export interface IConfig {
  meta: IMeta;
  navbar: INavbar;
  banner: IBanner;
};

export function getConfig(): IConfig {
  const fileContents = fs.readFileSync(configDirectory, 'utf8');
  const config = yaml.load(fileContents) as IConfig;

  return config;
}
