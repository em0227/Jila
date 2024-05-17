"use client";
import "./globals.css";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import NavBar from "./components/navBar";

//TODO write test only admin can see ticket list
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container lg:mx-auto mx-7">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
        >
          <NavBar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
