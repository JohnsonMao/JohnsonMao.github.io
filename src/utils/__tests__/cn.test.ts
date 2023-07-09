import cn from '../cn';

describe('TailwindCSS className merge function', () => {
  it('should return current className', () => {
    const className = cn('bg-blue-500 text-white/90', { 'bg-red-500': true });

    expect(className).toBe('text-white/90 bg-red-500');
  });
});
