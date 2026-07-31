"use client";

import TopNav from "@/components/site/TopNav";
import Footer from "@/components/site/Footer";
import SubscribeModal from "@/components/site/SubscribeModal";
import ChatWidget from "@/components/site/ChatWidget";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <TopNav />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <SubscribeModal />
      <ChatWidget />
    </div>
  );
}
