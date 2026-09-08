export type Message = {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  isHtml: boolean;
  receivedAt: number;
  read: boolean;
};
