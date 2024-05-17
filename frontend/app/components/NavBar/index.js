import React, { useState } from "react";

import Link from "next/link";
import { Button, Select } from "@mantine/core";

const NavBar = ({}) => {
  const [role, setRole] = useState("User");
  return (
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
  );
};

export default NavBar;
