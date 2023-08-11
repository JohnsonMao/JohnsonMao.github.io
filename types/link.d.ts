type DynamicRoutesWithoutLocalePath =
  __next_route_internal_types__.DynamicRoutes extends `/${string}${infer S}`
    ? S extends ''
      ? '/'
      : S
    : never;

type LinkWithoutLocalePathProps = {
  href: DynamicRoutesWithoutLocalePath;
};

type ExternalLinkProps = {
  href: `http${string}` | `mailto:${string}` | `tel:${string}`;
};
