import { render, screen } from '@testing-library/react';

import Image from '.';

describe('Image component', () => {
  it.each([
    {
      alt: 'Test image without specific dimensions',
    },
    {
      width: 100,
      height: 100,
      alt: 'Test image with specific dimensions',
    },
    {
      width: 100,
      height: 100,
      alt: 'Test image with base64',
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII=',
    },
  ])('should render correct element', ({ alt, ...props }) => {
    render(<Image src="https://external.com/test.jpg" alt={alt} {...props} style={{ background: '#000' }}/>);

    const checkParentElement = props.width === undefined;

    const image = screen.getByAltText(alt);
    expect(image.tagName).toBe('IMG');

    if (checkParentElement) {
      expect(image.parentElement?.tagName).toBe('PICTURE');
    }
  });
});
