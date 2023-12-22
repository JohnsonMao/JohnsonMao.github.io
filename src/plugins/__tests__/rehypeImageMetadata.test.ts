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
    // Arrange
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
    // Act
    const transformer = rehypeImageMetadata();
    const result = await transformer(testTree);
    // Assert
    expect(result.tagName).toBe('div');
  });

  it.each(['/test.jpeg', '/public/test.jpeg'])(
    'should set image properties for src: %s',
    async (src) => {
      // Arrange
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
      // Act
      const transformer = rehypeImageMetadata();
      const result = await transformer(testImageNode);
      // Assert
      expect(result).toStrictEqual({
        type: 'element',
        tagName: testImageNode.tagName,
        properties: {
          src: testImageNode.properties.src,
          width,
          height,
          base64: `data:image/${fileType};base64,${base64}`,
        },
      });
    }
  );
});
