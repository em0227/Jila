import axios from "axios";

export const createTicket = async (ticket) => {
  console.log("hit createTicket");
  const created = new Date();
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
      {
        created,
        ...{ ticket },
      }
    );
    console.log("result", result);
    return result.data;
  } catch (err) {
    return {
      success: false,
    };
  }
};
