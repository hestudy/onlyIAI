import { ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import {
  PlateEditor,
  TNodeEntry,
  Value,
  createPluginFactory,
  isElement,
} from "@udecode/plate-common";

const withCustomNormalizer = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>,
>(
  editor: E
) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]: TNodeEntry) => {
    // Normalize the node if necessary
    // ...

    if (isElement(node)) {
      if (node.type === ELEMENT_CODE_BLOCK) {
        if (node.children.length === 1 && !node.children[0].text) {
          editor.removeNodes({
            at: path,
          });
          return;
        }
      }
    }
    // Call other normalizers
    normalizeNode([node, path]);
  };

  return editor;
};

export const KEY_CUSTOM_NORMALIZER = "custom_normalize";

export const createCustomNormalizerPlugin = createPluginFactory({
  key: KEY_CUSTOM_NORMALIZER,
  withOverrides: withCustomNormalizer,
});
