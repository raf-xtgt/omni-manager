import { SendMessageResponse } from "../models/sendMessageResponse";

export const sendMessage = async (message: string): Promise<SendMessageResponse> => {
    try {
      const response = await fetch('http://localhost:5000/send_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: "include", // Only if your API requires credentials like cookies
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to send message' 
      };
    }
  };