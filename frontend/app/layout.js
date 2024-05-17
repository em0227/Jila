"use client";
import "./globals.css";

import Link from "next/link";
import React, { useState } from "react";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Button, Select } from "@mantine/core";

//TODO write test only admin can see ticket list
export default function RootLayout({ children }) {
  const [role, setRole] = useState("User");
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
          <div className="items-start justify-start lg:flex mt-5 lg:space-x-10">
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
              <Button variant="filled" className="mt-2 lg:mt-0">
                Create a Ticket
              </Button>
            </Link>
            {role === "Admin" && (
              <Link href={"/tickets"}>
                <Button variant="filled" className="mt-2 md:mt-0">
                  Check Current Ticket List now
                </Button>
              </Link>
            )}
          </div>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
