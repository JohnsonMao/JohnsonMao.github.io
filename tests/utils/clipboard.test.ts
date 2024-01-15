import { copyToClipboard } from "@/utils/clipboard";

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
    expect.assertions(1);
    const expected = TypeError('document.execCommand is not a function');
    const result = copyToClipboard('test');
    await expect(result).rejects.toStrictEqual(expected);
  });

  it('should call document execCommand', () => {
    setDeviceClipboard('old');
    copyToClipboard('test');
    expect(document.execCommand).toHaveBeenCalled();
  });

  it('should call navigator clipboard writeText', () => {
    setDeviceClipboard('new');
    copyToClipboard('test');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });
});
