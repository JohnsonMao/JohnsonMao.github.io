import Container from '../Container';

type FooterProps = {
  copyright: string;
};

function Footer({ copyright }: FooterProps) {
  return (
    <Container as="footer" className="flex justify-center gap-3 ">
      <a
        rel="license"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
      >
        CC BY-NC-SA 4.0
      </a>
      <span>{copyright}</span>
    </Container>
  );
}

export default Footer;
