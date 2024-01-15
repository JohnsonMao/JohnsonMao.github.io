import cn from "@/utils/cn";

describe('TailwindCSS className merge (cn) function', () => {
  it('should return current className', () => {
    const baseClassName = 'bg-blue-500 text-white/90';
    const mergeClassName = { 'bg-red-500': true };
    const expected = 'text-white/90 bg-red-500';
    const result = cn(baseClassName, mergeClassName);
    expect(result).toBe(expected);
  });
});
