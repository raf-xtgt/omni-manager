export interface ChatMessage {
    id: number;
    text: string;
    sender: "me" | "them";
    time: string;
  }