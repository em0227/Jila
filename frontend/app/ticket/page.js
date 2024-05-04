"use client";

import React from "react";
import { TextInput, Button, Group, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

//TODO create utils to fire requsets
//TODO admin should be able to update ticket in id page
//TODO admin can add replies
//TODO write test for create ticket & validation
//TODO write test only admin can see ticket list
const Ticket = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      email: "",
      author: "",
      description: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold">Ticket Page</h1>

      <Box maw={340}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="I can't reset my password"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <TextInput
            withAsterisk
            label="Author"
            placeholder="Your name"
            key={form.key("author")}
            {...form.getInputProps("author")}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="Your email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <Textarea
            placeholder="Describe your issue in details"
            label="Description"
            autosize
            minRows={2}
            key={form.key("description")}
            {...form.getInputProps("description")}
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
