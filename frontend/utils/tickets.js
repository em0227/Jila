import axios from "axios";

export const getTicket = async (id) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${id}`
    );
    return result.data;
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
    };
  }
};

export const getAllTickets = async () => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/all`
    );
    return result.data;
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
    };
  }
};

export const createTicket = async (ticket) => {
  const created = new Date();
  const { email, createdBy, title, description } = ticket;
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
      {
        created,
        email,
        createdBy,
        title,
        description,
      }
    );
    return result.data;
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
    };
  }
};

export const updateTicket = async (ticket) => {
  const updated = new Date();
  const { ticketId, status, updatedBy } = ticket;
  try {
    const result = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}`,
      {
        status,
        updated,
        updatedBy,
      }
    );
    return result.data;
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
    };
  }
};
