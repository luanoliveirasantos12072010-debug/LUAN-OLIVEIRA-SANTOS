/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { PAGE_BODY } from './content';
import { initPageInteractions } from './lib/pageInit';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initPageInteractions(containerRef.current);
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="home-repair-guide-app"
      dangerouslySetInnerHTML={{ __html: PAGE_BODY }}
    />
  );
}

