import copyToClipboard from '../copyToClipboard';

describe('Copy to clipboard function', () => {
  it('should return error with reject', async () => {
    expect.assertions(1);

    await expect(copyToClipboard('test')).rejects.toEqual(
      TypeError('document.execCommand is not a function')
    );
  });

  it('should call document execCommand', () => {
    Object.assign(document, {
      execCommand: jest.fn().mockImplementation(() => Promise.resolve()),
    });

    copyToClipboard('test');

    expect(document.execCommand).toBeCalled();
  });

  it('should call navigator clipboard writeText', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    copyToClipboard('test');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });
});
