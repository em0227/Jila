"use client";

import React, { useEffect, useState } from "react";

import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ReplyForm from "@/app/components/replyForm";
import TicketInfoBox from "@/app/components/ticketInfoBox";

import { getTicket } from "../../../utils/tickets";

const AdminTicket = ({ params }) => {
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
      } else {
        setSuccess(false);
        isMessageOpenedProps.open();
      }
    };

    getTicketData();
  }, [params.id]);

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
        <></>
      )}
      <Box className="mt-6">
        <TicketInfoBox
          id={params.id}
          setSuccess={setSuccess}
          ticketData={ticketData}
          setTicketData={setTicketData}
          isMessageOpenedProps={isMessageOpenedProps}
        />
        <h1 className="text-lg font-bold mt-6">Replies</h1>
        {repliesData.map((reply) => (
          <div
            key={reply.id}
            className="border-solid border-2 border-lightGray lg:w-2/6 space-y-2 px-2 rounded-md my-2"
          >
            <p>Reply created at: {new Date(reply.created).toLocaleString()}</p>
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
    </div>
  );
};

export default AdminTicket;
