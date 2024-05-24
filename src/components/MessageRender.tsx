import { ELEMENT_PARAGRAPH } from "@udecode/plate";
import { createBasicElementsPlugin } from "@udecode/plate-basic-elements";
import { createBasicMarksPlugin } from "@udecode/plate-basic-marks";
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import {
  Plate,
  PlateEditor,
  Value,
  createPlugins,
  findNode,
  findNodePath,
  focusEditor,
  getLastChild,
  getLastChildPath,
  getLastNode,
  getNodeLastNode,
  getNodeTexts,
  getPath,
} from "@udecode/plate-common";
import {
  createDeserializeMdPlugin,
  deserializeMd,
} from "@udecode/plate-serializer-md";
import { useEffect, useRef } from "react";
import { CodeBlockElement } from "./plate-ui/code-block-element";
import { CodeLineElement } from "./plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "./plate-ui/code-syntax-leaf";
import { Editor } from "./plate-ui/editor";
import { ParagraphElement } from "./plate-ui/paragraph-element";
import { createCustomNormalizerPlugin } from "@/plugins/customNormalizePlugin";

const plugins = createPlugins(
  [
    createBasicElementsPlugin(),
    createBasicMarksPlugin(),
    createDeserializeMdPlugin(),
    createCustomNormalizerPlugin(),
  ],
  {
    components: {
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
    },
  }
);

const MessageRender = (props: { md: string }) => {
  const editorRef = useRef<PlateEditor<Value>>(null);

  useEffect(() => {
    if (editorRef.current) {
      const fragment = deserializeMd(editorRef.current, props.md);
      console.log(fragment);
      if (fragment) {
        editorRef.current.select({
          anchor: editorRef.current.start([]),
          focus: editorRef.current.end([]),
        });
        editorRef.current.insertFragment(fragment);
      }
    }
  }, [props.md]);

  return (
    <Plate readOnly editorRef={editorRef} plugins={plugins}>
      <Editor variant={"ghost"}></Editor>
    </Plate>
  );
};

export default MessageRender;
