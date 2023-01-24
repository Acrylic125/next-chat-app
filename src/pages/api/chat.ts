import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "src/types/next";
import z from "zod";

export const messageBody = z.object({
  text: z.string(),
  user: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === "POST") {
    // get message
    const message = messageBody.parse(req.body);

    // dispatch to channel "message"

    res?.socket?.server?.io?.emit("message", {
      id: Math.random().toString(36),
      text: message.text,
      user: message.user,
      timestamp: Date.now(),
    });

    // return message
    res.status(201).json(message);
  }
}
