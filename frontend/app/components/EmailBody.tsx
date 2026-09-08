import { useRef, useState } from "react";
import DOMPurify from "dompurify";
import type { EmailBodyProps } from "../types/emailBody";

// Links inside a stranger's email should never take over the tab or leak
// the referrer — force them to open safely in a new one. Guarded to the
// browser: DOMPurify's Node-side build has no real `window`, so calling
// this at module scope during any server-side module evaluation (dev's
// SSR module graph, prerendering) would throw.
if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

export function EmailBody({ body, isHtml }: EmailBodyProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(120);

  if (!isHtml) {
    return (
      <div className="text-sm text-panda-ink dark:text-white/80 whitespace-pre-line">
        {body}
      </div>
    );
  }

  const sanitized = DOMPurify.sanitize(body, {
    WHOLE_DOCUMENT: true,
    ADD_TAGS: ["style"],
  });

  function handleLoad() {
    const doc = iframeRef.current?.contentDocument;
    if (doc?.body) {
      setHeight(doc.body.scrollHeight + 16);
    }
  }

  return (
    <iframe
      ref={iframeRef}
      title="Conteúdo do e-mail"
      // No "allow-scripts" — nothing inside can ever execute JS, regardless
      // of what slips past sanitization. "allow-same-origin" only lets *us*
      // read its height below; it's safe without allow-scripts alongside it.
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      srcDoc={sanitized}
      onLoad={handleLoad}
      className="w-full border-0 bg-white"
      style={{ height }}
    />
  );
}
