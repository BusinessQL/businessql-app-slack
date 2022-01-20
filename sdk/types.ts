export type SendMessageOptions = {
  channel: string;
  message: string;
  apiKey?: string;
};

export type SendMessageResult = {
  sent: boolean;
};
