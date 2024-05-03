"use client";

import React from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

const Ticket = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="mt-5 flex">
      <h1 className="text-lg font-bold">Ticket Page</h1>

      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Ticket Title"
            placeholder="I can't reset my password"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default Ticket;
