import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UpdateAnnouncementDialog } from "./UpdateAnnouncementDialog";
import { MailProvider } from "../lib/MailContext";
import { UPDATE_VERSION } from "../lib/updateAnnouncement";

const SEEN_UPDATE_KEY = "panda-mail-seen-update-version";

export default function SiteLayout() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_UPDATE_KEY) !== UPDATE_VERSION) {
        setShowUpdate(true);
      }
    } catch {
      // storage unavailable — just skip the announcement
    }
  }, []);

  function dismissUpdate() {
    setShowUpdate(false);
    try {
      localStorage.setItem(SEEN_UPDATE_KEY, UPDATE_VERSION);
    } catch {
      // ignore storage failures
    }
  }

  return (
    <MailProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-10">
          <Outlet />
        </main>
        <Footer />
      </div>
      <UpdateAnnouncementDialog open={showUpdate} onClose={dismissUpdate} />
    </MailProvider>
  );
}
