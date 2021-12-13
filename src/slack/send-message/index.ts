import { Request, Response } from 'express';
import { sendMessage } from '../utils';

export type SendMessagePayload = {
  token: string;
  channel: string;
  message: string;
};

export const sendMessageHandler = async (req: Request, res: Response) => {
  try {
    const { token, channel, message } = req.body.payload as SendMessagePayload;

    if (!token) {
      throw new Error('Missing: token');
    }

    if (!channel) {
      throw new Error('Missing: channel');
    }

    if (!message) {
      throw new Error('Missing: message');
    }

    await sendMessage({ token, channel, message });

    return res.json({ sent: true });
  } catch (error: any) {
    console.log(error.data);
    return res.status(500).send(error.data?.error || 'Failed to send message.');
  }
};
