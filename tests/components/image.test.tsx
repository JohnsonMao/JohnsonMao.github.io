import { render, screen } from '@testing-library/react';
import Image from '@/components/Image';

describe('Image component', () => {
  it.each([
    {
      alt: 'Test image without specific dimensions',
      parentTagName: 'PICTURE',
    },
    {
      width: 100,
      height: 100,
      alt: 'Test image with specific dimensions',
      parentTagName: 'DIV',
    },
    {
      width: 100,
      height: 100,
      alt: 'Test image with base64',
      parentTagName: 'DIV',
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII=',
    },
  ])('should render correct element', ({ alt, parentTagName, ...props }) => {
    render(<Image src="https://external.com/test.jpg" alt={alt} {...props} />);
    const image = screen.getByAltText(alt);
    expect(image.tagName).toBe('IMG');
    expect(image.parentElement?.tagName).toBe(parentTagName);
  });
});
