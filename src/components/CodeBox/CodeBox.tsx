'use client';

import { HTMLAttributes, useRef, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import cn from '@/utils/cn';
import { copyToClipboard } from '@/utils/clipboard';

type CodeBoxProps = HTMLAttributes<HTMLPreElement>;

function CodeBox(props: CodeBoxProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);

  const resetCopiedState = () => {
    setCopied(false);
    timerRef.current = null;
  };

  const handleClick = () => {
    const text = preRef.current?.textContent;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (text) {
      copyToClipboard(text)
        .then(() => {
          setCopied(true);
          timerRef.current = setTimeout(resetCopiedState, 1000);
        })
        .catch(resetCopiedState);
    }
  };

  return (
    <div className="group relative">
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
      <pre {...props} ref={preRef} />
    </div>
  );
}

export default CodeBox;
