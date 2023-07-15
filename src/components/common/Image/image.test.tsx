import { render, screen } from '@testing-library/react';

import Image from '.';

describe('Image component', () => {
  it('should render correct element', () => {
    const base64 =
      'data:image/jpg;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

    render(
      <>
        <Image
          src="https://external.com/test.jpg"
          alt="Test image without specific dimensions"
        />
        <Image
          src="https://external.com/test.jpg"
          width={100}
          height={100}
          alt="Test image with specific dimensions"
        />
        <Image
          src="https://external.com/test.jpg"
          width={100}
          height={100}
          base64={base64}
          alt="Test image with base64"
        />
      </>
    );

    const imageWithoutWidth = screen.getByAltText(
      'Test image without specific dimensions'
    );
    expect(imageWithoutWidth.tagName).toBe('IMG');
    expect(imageWithoutWidth.parentElement?.tagName).toBe('PICTURE');

    const imageWithWidth = screen.getByAltText(
      'Test image with specific dimensions'
    );
    expect(imageWithWidth.tagName).toBe('IMG');

    const imageWithBase64 = screen.getByAltText('Test image with base64');
    expect(imageWithBase64.tagName).toBe('IMG');
  });
});
