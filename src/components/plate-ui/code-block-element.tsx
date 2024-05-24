"use client";

import { cn, withRef } from "@udecode/cn";
import { useCodeBlockElementState } from "@udecode/plate-code-block";
import { PlateElement, getNodeTexts } from "@udecode/plate-common";

import { Check, Copy } from "lucide-react";
import "./code-block-element.css";
import { useBoolean } from "ahooks";

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });
    const [success, successAc] = useBoolean(false);

    return (
      <PlateElement
        className={cn("relative py-1", state.className, className)}
        ref={ref}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
          <code>{children}</code>
        </pre>

        <div
          className="absolute right-2 top-4 z-10 select-none cursor-pointer"
          onClick={() => {
            navigator.clipboard
              .writeText(
                Array.from(getNodeTexts(props.element))
                  .map((t) => t[0].text)
                  .join("\n")
              )
              .then(() => {
                successAc.setTrue();
                setTimeout(() => {
                  successAc.setFalse();
                }, 1000);
              });
          }}
          contentEditable={false}
        >
          {success && <Check className="size-4 text-green-500" />}
          {!success && <Copy className="size-4" />}
        </div>
      </PlateElement>
    );
  }
);
