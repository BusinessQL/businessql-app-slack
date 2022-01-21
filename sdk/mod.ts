import { SendMessageOptions, SendMessageResult } from './types.ts';
import { config } from '../config.ts';
import {
  BusinessQL,
  gql,
} from 'https://storage.nubo.codes/@businessql/businessql/0.0.2/mod.ts';

export class Slack {
  public static config = config;

  public static sendMessage = async ({
    channel,
    message,
    apiKey,
  }: SendMessageOptions): Promise<SendMessageResult> => {
    const result = await BusinessQL.graphql<{
      data: { sendMessage: { sent: boolean } };
    }>({
      query: gql`
        query SendMessage($channel: String!, $message: String!) {
          sendMessage(channel: $channel, message: $message) {
            sent
          }
        }
      `,
      variables: {
        channel,
        message,
      },
      apiKeyName: 'SLACK_API_KEY',
      apiKey,
    });

    return result.data.sendMessage;
  };
}
