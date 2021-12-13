import { WebClient } from '@slack/web-api';

export type SendMessageOptions = {
  token: string;
  channel: string;
  message: string;
};

export const sendMessage = async ({
  token,
  channel,
  message,
}: SendMessageOptions): Promise<void> => {
  const web = new WebClient(token);

  await web.chat.postMessage({
    text: message,
    channel,
  });
};
