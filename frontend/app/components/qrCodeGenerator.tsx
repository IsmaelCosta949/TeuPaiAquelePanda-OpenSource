import { useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { buttonVariants } from "./ui/button";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://teupaiaquelepanda.com.br");
  const [size, setSize] = useState(256);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!text) {
      setDataUrl(null);
      setError(null);
      return;
    }
    // Import dinâmico: a lib só é baixada quando a ferramenta é usada e fica
    // fora do pré-render.
    import("qrcode")
      .then((QRCode) =>
        QRCode.toDataURL(text, { width: size, margin: 2, errorCorrectionLevel: "M" }),
      )
      .then((url) => {
        if (cancelled) return;
        setDataUrl(url);
        setError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setDataUrl(null);
        setError("O texto é grande demais para caber num QR Code.");
      });
    return () => {
      cancelled = true;
    };
  }, [text, size]);

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma URL ou qualquer texto"
        aria-label="Conteúdo do QR Code"
        rows={3}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <Slider
        label="Tamanho (px)"
        minValue={128}
        maxValue={512}
        step={32}
        value={size}
        onChange={setSize}
      />

      <div role="status" aria-live="polite">
        {error && (
          <p className="text-xs font-medium text-panda-red dark:text-panda-red-light">
            {error}
          </p>
        )}
      </div>

      {dataUrl && (
        <div className="flex flex-col items-start gap-3">
          <img
            src={dataUrl}
            alt="QR Code gerado"
            width={size}
            height={size}
            className="max-w-full rounded-lg border border-panda-ink/15 bg-white dark:border-white/15"
          />
          <a href={dataUrl} download="qrcode.png" className={buttonVariants()}>
            Baixar PNG
          </a>
        </div>
      )}
    </div>
  );
}
