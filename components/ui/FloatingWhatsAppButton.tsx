"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

type FloatingWhatsAppButtonProps = {
  phone: string;
  message?: string;
  className?: string;
};

export function FloatingWhatsAppButton({
  phone,
  message,
  className = "",
}: FloatingWhatsAppButtonProps) {
  const normalizedPhone = phone.replace(/[^\d]/g, "");
  const baseUrl = `https://wa.me/${normalizedPhone}`;
  const url =
    message && message.trim().length > 0
      ? `${baseUrl}?text=${encodeURIComponent(message)}`
      : baseUrl;

  return (
    <a
      href={url}
      className={`floating-whatsapp-btn ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatta con noi su WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
