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
        'data:image/jpg;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
    },
  ])('should render correct element', ({ alt, ...props }) => {
    render(<Image src="https://external.com/test.jpg" alt={alt} {...props} />);

    const checkParentElement = props.width === undefined;

    const imageWithoutWidth = screen.getByAltText(alt);
    expect(imageWithoutWidth.tagName).toBe('IMG');

    if (checkParentElement) {
      expect(imageWithoutWidth.parentElement?.tagName).toBe('PICTURE');
    }
  });
});
