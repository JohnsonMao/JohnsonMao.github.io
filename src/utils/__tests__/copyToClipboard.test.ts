import copyToClipboard from '../copyToClipboard';

function setDeviceClipboard(version?: 'new' | 'old') {
  Object.assign(navigator, { clipboard: undefined });
  Object.assign(document, { execCommand: undefined });

  switch (version) {
    case 'new':
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
      break;
    case 'old':
      Object.assign(document, {
        execCommand: jest.fn().mockImplementation(() => Promise.resolve()),
      });
      break;
    default:
  }
}

describe('Copy to clipboard function', () => {
  it('should return error with reject', async () => {
    expect.assertions(1);

    await expect(copyToClipboard('test')).rejects.toEqual(
      TypeError('document.execCommand is not a function')
    );
  });

  it('should call document execCommand', () => {
    setDeviceClipboard('old');

    copyToClipboard('test');

    expect(document.execCommand).toBeCalled();
  });

  it('should call navigator clipboard writeText', () => {
    setDeviceClipboard('new');

    copyToClipboard('test');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });
});
