// components/TiptapEditor.tsx

"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";

import Color from "@tiptap/extension-color";

import { Bold, Italic, UnderlineIcon, List, ListOrdered, Heading2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextStyle } from "@tiptap/extension-text-style";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function TiptapEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
  Underline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Placeholder.configure({
    placeholder: "Nhập ghi chú...",
  }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-md border bg-white">
      <div className="flex gap-2 border-b p-2">
        <Button
  size="icon"
  type="button"
  variant={
    editor.isActive("highlight")
      ? "default"
      : "outline"
  }
  onClick={() =>
    editor
      .chain()
      .focus()
      .toggleHighlight()
      .run()
  }
>
  H
</Button>
<Button
  type="button"
  variant="outline"
  onClick={() =>
    editor
      .chain()
      .focus()
      .toggleHighlight({
        color: "#fef08a",
      })
      .run()
  }
>
  🖍️
</Button>
<Button
  type="button"
  variant="outline"
  onClick={() =>
    editor
      .chain()
      .focus()
      .setColor("#ef4444")
      .run()
  }
>
  🔴
</Button>
<Button
  type="button"
  variant="outline"
  onClick={() =>
    editor
      .chain()
      .focus()
      .unsetColor()
      .run()
  }
>
  Reset
</Button>
        <Button
          size="icon"
          type="button"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={editor.isActive("underline") ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <UnderlineIcon size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={
            editor.isActive("heading", { level: 2 })
              ? "default"
              : "outline"
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          <Heading2 size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={16} />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={16} />
        </Button>
      </div>

      <EditorContent editor={editor} className="prose prose-neutral max-w-none max-h-[30vh] overflow-y-auto p-4" />
    </div>
  );
}