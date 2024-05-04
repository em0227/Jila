"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Group, Box, Textarea, Modal, Text, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { updateTicket, getTicket } from "../../../utils/tickets";

//TODO admin should be able to update ticket in id page
//TODO admin can add replies
const AdminTicket = () => {
  const [status, setStatus] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);
  const [success, setSuccess] = useState(null);
  const [messageOpened, isMessageOpenedProps] = useDisclosure(false);

  const router = useRouter();

  useEffect(() => {
    const getTicketData = async () => {
      if (router && router.query.id) {
        const data = await getTicket(router.query.id);
        return data;
      }
    };

    const ticketData = getTicketData();

    if (ticketData.success) {
      setTicketData(ticketData.ticket);
      setRepliesData(ticketData.replies);
      setStatus(ticketData.status);
    } else {
      setSuccess(false);
      isMessageOpenedProps.open();
    }
  }, [router.query]);

  const ticketUpdates = useForm({
    mode: "uncontrolled",
    initialValues: {
      response: null,
      replyCreatedBy: null,
    },
  });

  //ticket data + dropdown to change status
  //update button display if status different
  //reply data
  //create a reply form

  //how to pass down chosen role to be status updatedBy
  if (!ticketData) return <></>;
  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold">View Ticket</h1>
      {success ? (
        <Modal
          opened={messageOpened}
          onClose={() => {
            isMessageOpenedProps.close();
            ticketUpdates.reset();
            setSuccess(null);
          }}
          withCloseButton={false}
          centered
        >
          Successfully updated the ticket.
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
          Failed to perform your request. Please try again or refresh the page.
        </Modal>
      ) : (
        <Box maw={340}>
          <div>
            <p>
              <Select
                placeholder="Ticket Status"
                data={["In Progress", "New", "Resolved"]}
                value={status}
                onChange={setStatus}
              />
              {status !== ticketData.status ? <Button>Update</Button> : <></>}
            </p>
            <p>
              <Text>Title</Text>: {ticketData.title}
            </p>
            <p>
              <Text>Author</Text>: {ticketData.createdBy}
            </p>
            <p>
              <Text>Created on</Text>: {ticketData.created}
            </p>
            <p>
              <Text>Description</Text>: {ticketData.description}
            </p>
          </div>
          <Text>Replies</Text>
          {repliesData.map((reply) => (
            <div>
              <p>{reply.created}</p>
              <p>{reply.created_by}</p>
              <p>{reply.response}</p>
            </div>
          ))}
          <Text>Add a Reply</Text>
          <form
            onSubmit={ticketUpdates.onSubmit(async (values) => {
              const result = await updateTicket(values);
              setSuccess(result.success);
              isMessageOpenedProps.open();
            })}
          >
            <Textarea
              placeholder="Write something"
              label="Reply"
              autosize
              minRows={2}
              key={ticketUpdates.key("response")}
              {...ticketUpdates.getInputProps("response")}
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

export default AdminTicket;
