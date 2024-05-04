"use client";

import React, { useState } from "react";
import { TextInput, Button, Group, Box, Textarea, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { createTicket } from "../../utils/tickets";

//TODO create utils to fire requsets
//TODO admin should be able to update ticket in id page
//TODO admin can add replies
//TODO write test for create ticket & validation
//TODO write test only admin can see ticket list
const Ticket = () => {
  const [success, setSuccess] = useState(null);
  const [messageOpened, isMessageOpenedProps] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      email: "",
      createdBy: "",
      description: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold">Ticket Page</h1>
      {success ? (
        <Modal
          opened={messageOpened}
          onClose={() => {
            isMessageOpenedProps.close();
            form.reset();
            setSuccess(null);
          }}
          withCloseButton={false}
          centered
        >
          Successfully submitted your ticket. We will handle your request soon.
        </Modal>
      ) : success === false ? (
        <Modal
          opened={messageOpened}
          onClose={() => {
            isMessageOpenedProps.close();
            setSuccess(null);
          }}
          withCloseButton={false}
          centered
        >
          Failed to create your ticket. Please try again.
        </Modal>
      ) : (
        <Box maw={340}>
          <form
            onSubmit={form.onSubmit(async (values) => {
              const result = await createTicket(values);
              setSuccess(result.success);
              isMessageOpenedProps.open();
            })}
          >
            <TextInput
              withAsterisk
              label="Title"
              placeholder="ex: I can't reset my password"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />

            <TextInput
              withAsterisk
              label="Author"
              placeholder="Your name"
              key={form.key("createdBy")}
              {...form.getInputProps("createdBy")}
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
      )}
    </div>
  );
};

export default Ticket;
