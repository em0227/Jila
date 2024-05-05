"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Table } from "@mantine/core";

import { getAllTickets } from "@/utils/tickets";

const TicketsList = () => {
  const [ticketsList, setTicketsList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getTicketsData = async () => {
      const data = await getAllTickets();
      if (data.success) {
        setTicketsList(data.tickets);
      }
    };

    getTicketsData();
  }, []);

  const handleClick = (id) => {
    router.push(`/ticket/${id}`);
  };

  const rows = ticketsList.map((ticket) => (
    <Table.Tr
      key={ticket.id}
      className="hover:bg-teal-100 hover:cursor-pointer"
      onClick={() => handleClick(ticket.id)}
    >
      <Table.Td>{ticket.title}</Table.Td>
      <Table.Td>{ticket.status}</Table.Td>
      <Table.Td>{new Date(ticket.created).toLocaleString()}</Table.Td>
      <Table.Td>
        {ticket.updated && new Date(ticket.updated).toLocaleString()}
      </Table.Td>
    </Table.Tr>
  ));

  //TODO sort tickets by time
  return ticketsList ? (
    <div className="mt-5">
      <h1 className="text-lg font-bold mb-6">Tickets List</h1>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>Updated</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  ) : (
    <div>Loading Data...</div>
  );
};

export default TicketsList;
