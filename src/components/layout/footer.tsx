import Container from '@/components/container1';
import Link from '@/components/link1';

type FooterProps = {
  copyright: string;
};

function Footer({ copyright }: FooterProps) {
  return (
    <Container as="footer" className="flex justify-center gap-3 py-4">
      <Link
        rel="license"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
      >
        CC BY-NC-SA 4.0
      </Link>
      <span>{copyright}</span>
    </Container>
  );
}

export default Footer;
