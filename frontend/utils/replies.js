import axios from "axios";

export const createReply = async (reply) => {
  const created = new Date();
  const { ticketId, response, createdBy } = reply;
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/replies`,
      {
        created,
        response,
        createdBy,
        ticketId,
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
