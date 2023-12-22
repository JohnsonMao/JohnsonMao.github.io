import { copyToClipboard } from '../clipboard';

function setDeviceClipboard(version?: 'new' | 'old') {
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
      Object.assign(navigator, { clipboard: undefined });
      Object.assign(document, { execCommand: undefined });
  }
}

describe('Copy to clipboard function', () => {
  beforeEach(() => {
    setDeviceClipboard();
  });

  it('should return error with reject', async () => {
    // Arrange
    expect.assertions(1);
    const expected = TypeError('document.execCommand is not a function');
    // Act
    const result = copyToClipboard('test');
    // Assert
    await expect(result).rejects.toStrictEqual(expected);
  });

  it('should call document execCommand', () => {
    // Arrange
    setDeviceClipboard('old');
    // Act
    copyToClipboard('test');
    // Assert
    expect(document.execCommand).toBeCalled();
  });

  it('should call navigator clipboard writeText', () => {
    // Arrange
    setDeviceClipboard('new');
    // Act
    copyToClipboard('test');
    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });
});
