import React, { useEffect, useState } from "react";

import { Text, Select, Button } from "@mantine/core";

import { updateTicket } from "../../../utils/tickets";

const TicketInfoBox = ({
  id,
  setSuccess,
  ticketData,
  setTicketData,
  isMessageOpenedProps,
}) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (ticketData) {
      console.log("ticketdat", ticketData, ticketData.status);
      const status =
        ticketData.status.charAt(0).toUpperCase() + ticketData.status.slice(1);
      setStatus(status);
    }
  }, [ticketData]);

  const handleUpdateStatus = async () => {
    const result = await updateTicket({
      status,
      ticketId: id,
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

  if (!ticketData) return <></>;
  return (
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
        <Text>Created on: {new Date(ticketData.created).toLocaleString()}</Text>
      </div>
      <div>
        <Text>Description: {ticketData.description}</Text>
      </div>
    </div>
  );
};

export default TicketInfoBox;
