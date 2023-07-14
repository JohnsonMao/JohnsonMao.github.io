/**
 * Custom rehype plugin to add width and height to local images
 * To make Next.js <Image/> works
 *
 * @see https://kylepfromer.com/blog/nextjs-image-component-blog
 */
import type { Node } from 'unist';
import imageSize from 'image-size';
import path from 'path';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';

const sizeOf = promisify(imageSize);

/** An `<img>` HAST node */
interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    height?: number;
    width?: number;
    base64?: string;
  };
}

/** Determines whether the given HAST node is an `<img>` element */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;

  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

/** Filters out non absolute paths from the public folder */
function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith('/');
}

async function getPlaiceholder(src: string) {
  const metadata = await sharp(src)
    .metadata()
    .then(({ width, height, ...metadata }) => {
      if (!width || !height) {
        throw Error('Could not get required image metadata');
      }

      return { width, height, ...metadata };
    });

  const pipeline = sharp(src)
    .resize(10, 10, {
      fit: 'inside',
    })
    .toFormat('png')
    .modulate({
      brightness: 1,
      saturation: 1.2,
    });

  const base64 = await pipeline
    .clone()
    .normalise()
    .toBuffer({ resolveWithObject: true })
    .then(
      ({ data, info }) =>
        `data:image/${info.format};base64,${data.toString('base64')}`
    )
    .catch((err) => {
      console.error('base64 generation failed', err);
      throw err;
    });

  return {
    base64,
    metadata,
  };
}

/** Adds the image's `height` and `width` to it's properties */
async function addMetadata(node: ImageNode): Promise<void> {
  const res = await sizeOf(
    path.join(process.cwd(), 'public', node.properties.src)
  );

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  const { base64 } = await getPlaiceholder(node.properties.src);

  node.properties.width = res.width;
  node.properties.height = res.height;
  node.properties.base64 = base64;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export default function rehypeImageMetadata() {
  return async function transformer(tree: ImageNode | Node) {
    const promiseImgNodes: Promise<void>[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        promiseImgNodes.push(addMetadata(node));
      }
    });

    await Promise.all(promiseImgNodes);

    return tree;
  };
}
