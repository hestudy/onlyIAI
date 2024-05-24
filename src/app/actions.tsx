"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { Loader } from "lucide-react";
import { z } from "zod";

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  tool?: MessageTool;
};

export type MessageTool = {
  name: string;
  result: any;
};

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

export async function sendMessage(history: Message[]) {
  "use server";
  const stream = createStreamableValue<{
    text?: string;
    tool?: MessageTool;
  }>();
  const aiState = createStreamableUI();
  const ui = createStreamableUI();
  (async () => {
    aiState.update(
      <div className="flex items-center space-x-1">
        <Loader className="animate-spin" />
        <div className="text-[12px]">努力思考中...</div>
      </div>
    );
    const { fullStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: "你是一位陪伴人类玩耍的小狗",
      messages: [
        ...history.map((item) => {
          return {
            role: item.role === "ai" ? "assistant" : "user",
            content: item.content,
          } as CoreMessage;
        }),
      ],
      tools: {
        test: {
          description: "测试方法",
          parameters: z.object({}),
          execute: async () => {
            return await new Promise((res) => {
              ui.update(<div>运行测试方法中</div>);
              setTimeout(() => {
                res("这是一个测试方法的返回值");
              }, 1000);
            });
          },
        },
      },
    });

    for await (const message of fullStream) {
      if (message.type === "text-delta") {
        stream.update({
          ...stream.value,
          text: message.textDelta,
        });
      }
      if (message.type === "tool-result") {
        stream.update({
          ...stream.value,
          tool: {
            name: message.toolName,
            result: message.result,
          },
        });
      }
    }

    stream.done();
    ui.done(<></>);
    aiState.done(<></>);
  })();

  return {
    text: stream.value,
    aiState: aiState.value,
    ui: ui.value,
  };
}
