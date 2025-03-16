import { z } from "zod";

export const MessageSchema = z.object({
  text: z.string(),
  user: z.string(),
  added: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;


const messages: Message[] = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    },
    {
        text: "Bounce on it crazy style",
        user: "Sven",
        added: new Date()
    },
  ];

  
export async function getMessages(){
    return messages
}

export async function pushMessage(message:Message){
  messages.push(message)
}