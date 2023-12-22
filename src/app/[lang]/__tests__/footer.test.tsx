import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component', () => {
  it('should render correct element', () => {
    // Arrange
    const footerCopyright = 'footer copyright';
    render(<Footer copyright={footerCopyright} />);
    const footer = screen.getByRole('contentinfo');
    // Assert
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(footerCopyright);
  });
});
