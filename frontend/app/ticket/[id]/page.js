"use client";

import React, { useEffect, useState } from "react";

import { Box, Modal, Text, Select, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ReplyForm from "@/app/components/replyForm";

import { updateTicket, getTicket } from "../../../utils/tickets";

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
    console.log(
      `Would normally send email here with body: Your ticket status is updated to ${status}`
    );
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
          <ReplyForm
            id={params.id}
            setRepliesData={setRepliesData}
            isMessageOpenedProps={isMessageOpenedProps}
            setSuccess={setSuccess}
          />
        </Box>
      )}
    </div>
  );
};

export default AdminTicket;
