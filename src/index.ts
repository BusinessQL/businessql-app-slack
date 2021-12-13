import { Request, Response } from 'express';
import { sendMessageHandler } from './slack/send-message';

export const main = async (req: Request, res: Response) => {
  try {
    const { action } = req.body;

    switch (action) {
      case 'sendMessage':
        return sendMessageHandler(req, res);
      default:
        break;
    }
    throw new Error(`Invalid action: ${action}`);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed' });
  }
};
