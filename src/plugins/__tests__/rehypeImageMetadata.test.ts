import rehypeImageMetadata, {
  ElementNode,
  ImageNode,
} from '../rehypeImageMetadata';

const mockSharpMetadata = jest.fn();
const mockSharpBase64 = jest.fn();

jest.mock('fs', () => ({ readFileSync: () => Buffer.alloc(8) }));
jest.mock('sharp', () => () => ({
  metadata: () => mockSharpMetadata(),
  resize: () => ({
    toFormat: () => ({
      clone: () => ({
        normalise: () => ({
          toBuffer: () => mockSharpBase64(),
        }),
      }),
    }),
  }),
}));
jest.mock('unist-util-visit', () => ({
  visit: <T>(tree: T, check: 'element', visitor: (tree: T) => void) => {
    visitor(tree);
  },
}));

describe('Rehype image metadata function', () => {
  beforeEach(() => {
    mockSharpMetadata.mockClear();
    mockSharpBase64.mockClear();
  });

  it('should format paragraph with image element to a div', async () => {
    const testImageNode: ImageNode = {
      type: 'element',
      tagName: 'img',
      properties: {
        src: '/test.png',
      },
    };
    const testTree: ElementNode = {
      type: 'element',
      tagName: 'p',
      children: [testImageNode],
    };
    const transformer = rehypeImageMetadata();
    const result = await transformer(testTree);

    expect(result.tagName).toBe('div');
  });

  it.each(['/test.jpeg', '/public/test.jpeg'])(
    'should set image properties for src: %s',
    async (src) => {
      const width = 2;
      const height = 1;
      const fileType = 'png';
      const base64 = 'Test base64';
      const testImageNode: ImageNode = {
        type: 'element',
        tagName: 'img',
        properties: { src },
      };
      mockSharpMetadata.mockResolvedValueOnce({ width, height });
      mockSharpBase64.mockResolvedValueOnce({
        info: { format: fileType },
        data: base64,
      });
      const transformer = rehypeImageMetadata();
      const result = await transformer(testImageNode);

      expect(result.tagName).toBe(testImageNode.tagName);
      expect(result.properties.src).toBe(testImageNode.properties.src);
      expect(result.properties.width).toBe(width);
      expect(result.properties.height).toBe(height);
      expect(result.properties.base64).toBe(
        `data:image/${fileType};base64,${base64}`
      );
    }
  );
});
