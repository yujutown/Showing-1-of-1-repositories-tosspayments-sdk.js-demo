import * as fs from 'fs';

export async function readHtmlFile(name: string) {
  return fs.promises.readFile(`./public/${name}.html`, { encoding: "utf-8" })
}
