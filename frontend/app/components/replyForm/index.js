import React from "react";

import { Group, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

import { createReply } from "@/utils/replies";

const ReplyForm = ({
  id,
  setRepliesData,
  isMessageOpenedProps,
  setSuccess,
}) => {
  const ticketUpdates = useForm({
    mode: "uncontrolled",
    initialValues: {
      response: null,
      createdBy: "Admin",
    },
  });

  return (
    <form
      onSubmit={ticketUpdates.onSubmit(async (values) => {
        const result = await createReply({
          ...values,
          ticketId: id,
        });
        if (result.success) {
          setRepliesData(result.replies);
          console.log(
            `Would normally send email here with body: ${values.response}`
          );
          ticketUpdates.reset();
        }
        setSuccess(result.success);
        isMessageOpenedProps.open();
      })}
      className="w-2/6"
    >
      <Textarea
        required
        placeholder="Write something"
        autosize
        minRows={2}
        key={ticketUpdates.key("response")}
        {...ticketUpdates.getInputProps("response")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default ReplyForm;
