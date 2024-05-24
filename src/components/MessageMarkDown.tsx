import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageMarkDown = (props: { content: string }) => {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={atomDark}
              showLineNumbers
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        p(props) {
          return (
            <p
              {...props}
              className={`${props.className || ""} leading-7 [&:not(:first-child)]:mt-6`}
            ></p>
          );
        },
      }}
    >
      {props.content}
    </Markdown>
  );
};

export default MessageMarkDown;
