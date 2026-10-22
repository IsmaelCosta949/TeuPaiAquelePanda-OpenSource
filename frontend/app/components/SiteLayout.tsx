import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AdSenseScript } from "./AdSenseScript";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HalloweenDecor } from "./HalloweenDecor";
import { UpdateAnnouncementDialog } from "./UpdateAnnouncementDialog";
import { MailProvider } from "../hooks/MailContext";
import { UPDATE_DATE } from "../lib/updateAnnouncement";

const SEEN_UPDATE_KEY = "panda-mail-seen-update-version";

export default function SiteLayout() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(SEEN_UPDATE_KEY) !== UPDATE_DATE) {
      return setShowUpdate(true);
    }
  }, []);

  function dismissUpdate() {
    setShowUpdate(false);
    try {
      localStorage.setItem(SEEN_UPDATE_KEY, UPDATE_DATE);
    } catch {
      console.warn("Failed to save update version to localStorage");
    }
  }

  return (
    <MailProvider>
      <AdSenseScript />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-panda-red focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <HalloweenDecor />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main
          id="main-content"
          className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-10"
        >
          <Outlet />
        </main>
        <Footer />
      </div>
      <UpdateAnnouncementDialog open={showUpdate} onClose={dismissUpdate} />
    </MailProvider>
  );
}
