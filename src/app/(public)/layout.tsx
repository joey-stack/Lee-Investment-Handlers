import React from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}

PublicLayout.displayName = "PublicLayout";
