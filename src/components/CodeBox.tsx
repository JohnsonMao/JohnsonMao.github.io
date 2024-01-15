'use client';

import { HTMLAttributes, useRef } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import useAutoReset from '@/hooks/useAutoReset';
import cn from '@/utils/cn';
import { copyToClipboard } from '@/utils/clipboard';

type CodeBoxProps = HTMLAttributes<HTMLPreElement>;

function CodeBox(props: CodeBoxProps) {
  const preElementRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useAutoReset(false);

  const handleClick = () => {
    const text = preElementRef.current?.textContent;

    if (text) {
      copyToClipboard(text).then(() => setCopied(true));
    }
  };

  return (
    <div className="not-prose group relative">
      <div className="absolute right-0 top-0 z-10 m-2 flex items-center text-white/90">
        <span
          className={cn('text-xs transition-opacity', {
            'opacity-0': !copied,
          })}
        >
          複製成功！
        </span>
        <button
          className="rounded border border-white/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleClick}
        >
          <AiOutlineCopy />
        </button>
      </div>
      <pre {...props} ref={preElementRef} />
    </div>
  );
}

export default CodeBox;
