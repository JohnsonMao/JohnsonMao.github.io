/**
 * Implementing a "Copy to Clipboard" functionality while ensuring compatibility
 * 
 * @see https://philstainer.io/blog/copy-code-button-markdown
 */
export function copyToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector('body');
        const textarea = document.createElement('textarea');

        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand('copy');

        body?.removeChild(textarea);

        resolve(undefined);
      } catch (e) {
        reject(e);
      }
    }
  });
}
