import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "src/types/next";
import z from "zod";

export const messageBodySchema = z.object({
  text: z.string(),
  user: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === "POST") {
    const messageBody = messageBodySchema.parse(req.body);

    const messageObject = {
      id: Math.random().toString(36),
      text: messageBody.text,
      user: messageBody.user,
      timestamp: Date.now(),
    };
    res?.socket?.server?.io?.emit("message", messageObject);

    // return message
    res.status(201).json(messageObject);
  }
}
