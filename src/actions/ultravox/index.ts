"use server";

export interface Message {
  text: string;
  role: "MESSAGE_ROLE_AGENT" | "MESSAGE_ROLE_USER" | string;
  callStageMessageIndex: number;
}

export interface ApiResponse {
  results: Message[];
  next?: string | null;
  previous: string | null;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export async function getCallTranscript(callId: string) {
  let allMessages: Message[] = [];
  let nextCursor: string | null = null;
  try {
    do {
      const url: string = `https://api.ultravox.ai/api/calls/${callId}/messages${
        nextCursor ? `?cursor=${nextCursor}` : ""
      }`;
      const response: Response = await fetch(url, {
        headers: {
          "X-API-Key": process.env.ULTRADOX_API_KEY as string,
          Accept: "application/json",
        },
        cache: "force-cache",
      });
      if (!response.ok) {
        return { status: response.status, message: "Server error" };
      }
      const data: ApiResponse = await response.json();
      allMessages = allMessages.concat(data.results);
      nextCursor = data.next
        ? new URL(data.next).searchParams.get("cursor")
        : null;
    } while (nextCursor);
    return { status: 200, data: allMessages };
  } catch (error) {
    return { status: 500, message: (error as Error).message };
  }
}

export const getVoices = async () => {
  try {
    const options = {
      method: "GET",
      headers: { "X-API-Key": process.env.ULTRADOX_API_KEY || "" },
    };
    const res = await fetch("https://api.ultravox.ai/api/voices", options);
    const data = await res.json();
    return { status: 200, data: data.results };
  } catch (error) {
    return { status: 500, message: (error as Error).message };
  }
};

export const getCallRecording = async (callId: string) => {
  try {
    const options = {
      method: "GET",
      headers: { "X-API-Key": process.env.ULTRADOX_API_KEY || "" },
    };
    const res = await fetch(
      `https://api.ultravox.ai/api/calls/${callId}/recording`,
      options
    );

    const blob = await res.json();
    const wavBlob = new Blob([blob], { type: "audio/wav" });
    return { status: 200, data: wavBlob };
  } catch (error) {
    return { status: 500, message: (error as Error).message };
  }
};
