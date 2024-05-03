"use client";
import "./globals.css";

import Link from "next/link";
import React, { useState } from "react";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";

export default function RootLayout({ children }) {
  const [role, setRole] = useState("User");
  return (
    <html lang="en">
      <body className="container mx-auto">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
        >
          <div className="flex space-x-10">
            <div className="flex">
              <p className="mr-3 pt-2">Pick a Role</p>
              <Select
                placeholder="Pick a role"
                data={["User", "Admin"]}
                value={role}
                onChange={setRole}
              />
            </div>
            <Link href={"/ticket"}>
              <Button variant="filled">Create a Ticket</Button>
            </Link>
            {role === "Admin" && (
              <Link href={"/tickets"}>
                <Button variant="filled">Check Current Ticket List now</Button>
              </Link>
            )}
          </div>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
