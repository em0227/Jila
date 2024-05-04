import axios from "axios";

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
