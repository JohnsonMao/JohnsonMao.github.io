import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const settingsDirectory = path.join(process.cwd(), 'settings.yml');

export function getSettings(): ISettings {
  const fileContents = fs.readFileSync(settingsDirectory, 'utf8');
  const settings = yaml.load(fileContents) as ISettings;

  return settings;
}
