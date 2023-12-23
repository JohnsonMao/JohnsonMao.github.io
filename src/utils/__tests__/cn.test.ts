import cn from '../cn';

describe('TailwindCSS className merge function', () => {
  it('should return current className', () => {
    // Arrange
    const baseClassName = 'bg-blue-500 text-white/90';
    const mergeClassName = { 'bg-red-500': true };
    const expected = 'text-white/90 bg-red-500';
    // Act
    const className = cn(baseClassName, mergeClassName);
    // Assert
    expect(className).toBe(expected);
  });
});
