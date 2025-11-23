import { render, screen } from '#/tests/__helpers__/test-utils';
import Footer from '@/app/[lang]/Footer';

describe('Footer component', () => {
  it('should render correct element', () => {
    const footerCopyright = 'footer copyright';
    render(<Footer copyright={footerCopyright} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(footerCopyright);
  });
});
