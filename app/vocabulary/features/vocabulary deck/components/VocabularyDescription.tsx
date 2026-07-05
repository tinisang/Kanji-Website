"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  description: string;
  onSave?: (value: string) => void;
}

export default function VocabularyDescription({
  description,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[80px] focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editing) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        const html = editor?.getHTML() ?? "";
        onSave?.(html);
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, [editing, editor, onSave]);

  useEffect(() => {
    if (editing && editor) {
      editor.commands.focus("end");
    }
  }, [editing, editor]);

  if (!editing) {
    return (
      <div
        className="cursor-text rounded-md p-2 transition hover:bg-gray-50"
        onClick={() => setEditing(true)}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-md border border-emerald-300 bg-white p-2"
    >
      <EditorContent editor={editor} />
    </div>
  );
}