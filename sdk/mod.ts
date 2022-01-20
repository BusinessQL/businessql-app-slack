import { SendMessageOptions, SendMessageResult } from './types.ts';

const SLACK_API_KEY =
  Deno.env.get('SLACK_API_KEY') ||
  Deno.env.get('BUSINESSQL_API_KEY') ||
  Deno.env.get('API_KEY') ||
  '';

export class Slack {
  public static sendMessage = async ({
    channel,
    message,
    apiKey,
  }: SendMessageOptions): Promise<SendMessageResult> => {
    const key = apiKey || SLACK_API_KEY;

    if (!key) {
      throw new Error('Missing variable Slack API key');
    }

    const response = await fetch('https://graphql.businessql.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
      },
      body: JSON.stringify({
        query: `query SendMessage($channel: String!, $message: String!) {
            sendMessage(channel: $channel, message: $message) {
              sent
            }
          }`,
        variables: {
          channel,
          message,
        },
      }),
    });
    const result = await response.json();

    if (result.errors) {
      throw result.errors?.[0]?.message
        ? new Error(result.errors?.[0]?.message)
        : result.errors;
    }

    return result.data.sendMessage;
  };
}
