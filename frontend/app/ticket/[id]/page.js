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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { updateTicket, getTicket } from "../../../utils/tickets";
import { createReply } from "@/utils/replies";

const AdminTicket = ({ params }) => {
  const [status, setStatus] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);
  const [success, setSuccess] = useState(null);
  const [messageOpened, isMessageOpenedProps] = useDisclosure(false);

  useEffect(() => {
    const getTicketData = async () => {
      const data = await getTicket(params.id);
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
      createdBy: "Admin",
    },
  });

  //TODO: re seend db and don't need to do uppercase for status
  const handleUpdateStatus = async () => {
    const result = await updateTicket({
      status,
      ticketId: params.id,
      updatedBy: "Admin",
    });

    if (!result.success) {
      setStatus(status.charAt(0).toUpperCase() + status.slice(1));
    } else {
      setTicketData({ ...ticketData, status });
    }
    setSuccess(result.success);
    isMessageOpenedProps.open();
  };

  //TODO: how to pass down chosen role to be status updatedBy
  if (!ticketData || !repliesData) return <>Loading ticket data</>;

  return (
    <div className="mt-5">
      <h1 className="text-lg font-bold">Ticket Details</h1>
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
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Text>Ticket Status: </Text>
              <Select
                placeholder="Ticket Status"
                data={["In Progress", "New", "Resolved"]}
                value={status}
                onChange={setStatus}
                defaultValue={status}
                className="max-w-fit"
              />
              {status !== ticketData.status ? (
                <Button onClick={handleUpdateStatus}>Update</Button>
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
              <Text>
                Created on: {new Date(ticketData.created).toLocaleString()}
              </Text>
            </div>
            <div>
              <Text>Description: {ticketData.description}</Text>
            </div>
          </div>
          <h1 className="text-lg font-bold mt-6">Replies</h1>
          {repliesData.map((reply) => (
            <div
              key={reply.id}
              className="border-solid border-2 border-indigo-600 w-2/6 space-y-2"
            >
              <p>
                Reply created at: {new Date(reply.created).toLocaleString()}
              </p>
              <p>Replied by: {reply.created_by}</p>
              <p>Response: {reply.response}</p>
            </div>
          ))}
          <div className="mt-6">Add a Reply</div>
          <form
            onSubmit={ticketUpdates.onSubmit(async (values) => {
              const result = await createReply({
                ...values,
                ticketId: params.id,
              });
              setSuccess(result.success);
              setRepliesData(result.replies);
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
        </Box>
      )}
    </div>
  );
};

export default AdminTicket;
