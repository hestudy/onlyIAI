"use client";

import MessageMarkDown from "@/components/MessageMarkDown";
import { Textarea } from "@/components/ui/textarea";
import { useRequest } from "ahooks";
import { nanoid } from "ai";
import { readStreamableValue } from "ai/rsc";
import { useEffect, useState } from "react";
import { Message, sendMessage } from "./actions";

export default function Page() {
  const [message, setMessage] = useState<Message[]>([]);
  const [value, setValue] = useState<string>("");
  const [aiState, setAiState] = useState<JSX.Element>();
  const [uiState, setUiState] = useState<JSX.Element>();

  const { run } = useRequest(
    async (history: Message[]) => {
      const { text, aiState, ui } = await sendMessage(history);
      setAiState(aiState);
      setUiState(ui);
      let content = "";
      const id = nanoid();
      for await (const item of readStreamableValue(text)) {
        content = `${content}${item?.text || ""}`;
        setMessage([
          ...history,
          {
            id,
            content,
            role: "ai",
            tool: item?.tool,
          },
        ]);
      }
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-0 overflow-y-auto">
        {message.map((item) => {
          return (
            <div key={item.id} className="mb-2 p-2">
              <div>{item.role}</div>
              {item.content && (
                <div className="p-2 rounded bg-gray-100">
                  <MessageMarkDown content={item.content}></MessageMarkDown>
                </div>
              )}
              {item.tool && (
                <div className="text-[12px] bg-gray-100 rounded p-2 w-fit">
                  {item.tool.name}：{item.tool.result}
                </div>
              )}
            </div>
          );
        })}
        {uiState}
        {aiState}
      </div>
      <div className="p-2 h-[100px]">
        <Textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="今天想聊点什么呢？"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (value) {
                const history = [
                  ...message,
                  {
                    id: nanoid(),
                    content: value,
                    role: "user",
                  } as Message,
                ];
                setMessage(history);
                run(history);
                setValue("");
              }
            }
          }}
        ></Textarea>
      </div>
    </div>
  );
}
