"use client";

import { motion, useReducedMotion } from "framer-motion";

import { whatsappLink, whatsappMessages } from "@/data/content";
import Icon from "./ui/Icon";

/**
 * Floating WhatsApp button, fixed to the bottom-right corner on every page.
 * Opens the chat with a quote request already typed in.
 */
export default function WhatsAppButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={whatsappLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bilic Cleaning Company on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-7"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.35, ease: "easeOut" }}
    >
      <Icon name="MessageCircle" className="h-7 w-7" />
      <span className="sr-only">WhatsApp</span>
    </motion.a>
  );
}
