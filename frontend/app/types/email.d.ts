export interface EmailArmazenado {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  isHtml: boolean;
  receivedAt: number;
}
