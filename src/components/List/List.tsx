import { Key, ReactNode } from 'react';

type ListPropsWithDefaultKey<T extends Record<string, unknown>> = {
  primaryKey?: 'id';
  items: (T & Record<'id', Key>)[];
};

type ListPropsWithCustomKey<
  T extends Record<string, unknown>,
  P extends keyof T
> = {
  primaryKey: P;
  items: (T & Record<P, Key>)[];
};

type ListProps<T extends Record<string, unknown>, P extends keyof T> = (
  | ListPropsWithDefaultKey<T>
  | ListPropsWithCustomKey<T, P>
) & {
  render: (props: T) => ReactNode;
};

function List<T extends Record<string, unknown>, P extends string & keyof T>({
  render,
  items,
  primaryKey = 'id' as P,
}: ListProps<T, P>) {
  return (
    <section>
      <ul className="flex flex-col gap-4">
        {items.map((data) => (
          <li key={data[primaryKey]}>{render(data)}</li>
        ))}
      </ul>
    </section>
  );
}

export default List;
