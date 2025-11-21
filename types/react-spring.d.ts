/**
 * @see https://stackoverflow.com/questions/79533741/react-spring-web-children-not-defined
 */
import reactSpring from '@react-spring/web';

declare module '@react-spring/web' {
  const animated = {
    children: React.ReactNode,
    ...reactSpring.animated,
  };
}
