export function loader() {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const publisherId = clientId?.replace(/^ca-/, "");

  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# VITE_ADSENSE_CLIENT_ID não definido neste build.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
