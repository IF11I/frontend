/**
 * A response message that is received from the server.
 *
 * @author Nils Weber
 */
export interface ResponseMessage {

  /** Indicates wether this message indicates success or failure. */
  isSuccessful: boolean;

  /** The message's text. */
  messageText: string;

}
