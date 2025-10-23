"use client";

import React from "react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "@heroui/button";

const goToPage = (url: string): void => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

const Footer: React.FC = () => (
  <footer
    className="min-h-screen w-full flex flex-wrap items-center justify-center gap-8"
    id="contact"
  >
    <Button
      onPress={() => goToPage("https://www.linkedin.com/company/sincenobody/")}
      variant="light"
      isIconOnly
      size="lg"
    >
      <FaLinkedinIn size={24} />
    </Button>
    <Button
      onPress={() => goToPage("https://www.instagram.com/since.nobody/")}
      variant="light"
      isIconOnly
      size="lg"
    >
      <FaInstagram size={24} />
    </Button>
    <Button
      onPress={() => goToPage("https://x.com/since_nobody")}
      variant="light"
      isIconOnly
      size="lg"
    >
      <FaXTwitter size={24} />
    </Button>
  </footer>
);

export default Footer;
