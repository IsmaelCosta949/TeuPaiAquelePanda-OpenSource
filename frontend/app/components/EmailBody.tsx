import { useRef, useState } from "react";
import DOMPurify from "dompurify";

if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

export function EmailBody({ ...props }: { body: string; isHtml: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(120);

  if (!props.isHtml) {
    return (
      <div className="text-sm text-panda-ink dark:text-white/80 whitespace-pre-line break-words">
        {props.body}
      </div>
    );
  }

  const sanitized = DOMPurify.sanitize(props.body, {
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
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      srcDoc={sanitized}
      onLoad={handleLoad}
      className="w-full border-0 bg-white"
      style={{ height }}
    />
  );
}
