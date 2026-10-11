import { useId, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { base64UrlDecode } from "~/lib/base64UrlDecode";

export default function JwtDecoder() {
  const errorId = useId();
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [expiry, setExpiry] = useState<{
    label: string;
    expired: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function decode() {
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      setError(
        "Token precisa ter 3 partes separadas por ponto (header.payload.assinatura)",
      );
      setHeader("");
      setPayload("");
      setExpiry(null);
      return;
    }

    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]));
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
      setHeader(JSON.stringify(headerJson, null, 2));
      setPayload(JSON.stringify(payloadJson, null, 2));
      setError(null);

      if (typeof payloadJson.exp === "number") {
        const expDate = new Date(payloadJson.exp * 1000);
        setExpiry({
          label: expDate.toLocaleString("pt-BR"),
          expired: expDate.getTime() < Date.now(),
        });
      } else {
        setExpiry(null);
      }
    } catch {
      setError("Não foi possível decodificar — verifique se é um JWT válido");
      setHeader("");
      setPayload("");
      setExpiry(null);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-panda-gray dark:text-white/50">
        Só decodifica o conteúdo — não verifica a assinatura nem valida o token.
      </p>

      <Textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Cole o token JWT aqui (eyJhbGc...)"
        aria-label="Token JWT para decodificar"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        rows={4}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm break-all text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <Button onPress={decode}>Decodificar</Button>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-panda-red dark:text-panda-red-light font-medium"
        >
          {error}
        </p>
      )}

      {(header || payload) && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-panda-gray dark:text-white/50">
              Header
            </p>
            <pre className="w-full max-h-72 overflow-auto rounded-lg border border-panda-ink/15 dark:border-white/15 bg-panda-cream dark:bg-white/5 px-4 py-3 text-sm font-mono text-panda-ink dark:text-panda-paper whitespace-pre-wrap break-all">
              {header}
            </pre>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-panda-gray dark:text-white/50">
              Payload
            </p>
            <pre className="w-full max-h-72 overflow-auto rounded-lg border border-panda-ink/15 dark:border-white/15 bg-panda-cream dark:bg-white/5 px-4 py-3 text-sm font-mono text-panda-ink dark:text-panda-paper whitespace-pre-wrap break-all">
              {payload}
            </pre>
          </div>
        </div>
      )}

      {expiry && (
        <p
          className={`text-xs font-semibold ${
            expiry.expired
              ? "text-panda-red dark:text-panda-red-light"
              : "text-panda-gray dark:text-white/50"
          }`}
        >
          {expiry.expired ? "Expirado em " : "Expira em "}
          {expiry.label}
        </p>
      )}
    </div>
  );
}
