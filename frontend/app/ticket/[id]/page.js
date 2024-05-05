"use client";

import React, { useEffect, useState } from "react";

import {
  Group,
  Box,
  Textarea,
  Modal,
  Text,
  Select,
  Button,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { updateTicket, getTicket } from "../../../utils/tickets";

//TODO admin should be able to update ticket in id page
//TODO admin can add replies
const AdminTicket = ({ params }) => {
  const [status, setStatus] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);
  const [success, setSuccess] = useState(null);
  const [messageOpened, isMessageOpenedProps] = useDisclosure(false);

  // const router = useRouter();

  useEffect(() => {
    console.log("params", params);
    const getTicketData = async () => {
      // if (router.query && router.query.id) {
      const data = await getTicket(params.id);
      // }
      if (data.success) {
        setTicketData(data.ticket);
        setRepliesData(data.replies);
        const status = data.ticket.status;
        setStatus(status.charAt(0).toUpperCase() + status.slice(1));
      } else {
        setSuccess(false);
        isMessageOpenedProps.open();
      }
    };

    getTicketData();
  }, [params.id]);

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
  console.log("status", status);
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
        <Box className="mt-6">
          <div>
            <div>
              <Select
                placeholder="Ticket Status"
                data={["In Progress", "New", "Resolved"]}
                value={status}
                onChange={setStatus}
                defaultValue={status}
                className="max-w-fit"
              />
              {status.toLowerCase() !== ticketData.status ? (
                <Button>Update</Button>
              ) : (
                <></>
              )}
            </div>
            <div>
              <Text>Title: {ticketData.title}</Text>
            </div>
            <div>
              <Text>Author: {ticketData.created_by}</Text>
            </div>
            <div>
              <Text>Created on: {ticketData.created}</Text>
            </div>
            <div>
              <Text>Description: {ticketData.description}</Text>
            </div>
          </div>
          <h1 className="text-lg font-bold mt-6">Replies</h1>
          {repliesData.map((reply) => (
            <div className="border-solid border-2 border-indigo-600 w-2/6">
              <p>Reply created at: {reply.created}</p>
              <p>Replied by: {reply.created_by}</p>
              <p>Response: {reply.response}</p>
            </div>
          ))}
          <div className="mt-6">Add a Reply</div>
          <form
            onSubmit={ticketUpdates.onSubmit(async (values) => {
              const result = await updateTicket(values);
              setSuccess(result.success);
              isMessageOpenedProps.open();
            })}
            className="w-2/6"
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
