import { useEffect } from "react";
import { useLocation } from "react-router";

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID;
const SCRIPT_ID = "adsense-script";
const NO_ADS_PATHS = ["/caixa-de-entrada", "/email/"];

function hasAds(pathname: string) {
  return !NO_ADS_PATHS.some((path) => pathname.startsWith(path));
}

export function AdSenseScript() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!CLIENT_ID || !hasAds(pathname)) return;
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    document.head.appendChild(script);
  }, [pathname]);

  return null;
}
