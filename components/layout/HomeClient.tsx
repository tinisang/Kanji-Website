'use client';
import { DragDropProvider, KeyboardSensor, PointerSensor } from "@dnd-kit/react";
import ClassifiedKanjis from "./ClassifiedKanjis";

import { RestrictToWindow } from "@dnd-kit/dom/modifiers";

import UnClassifiedKanjis from "./UnClassifiedKanjis";
import { useKanji } from "@/contexts/Context";
import { useEffect, useState } from "react";
import { move } from "@dnd-kit/helpers";


export default function HomeClient() {
  const {data,setData} = useKanji();

  const [items, setItems]=useState(data.kanji_group_items);
  

  useEffect(()=>{
    console.log(items)
  },[items])



  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;
      
        if (source?.type === "group") return;

        setItems((items) => move(items, event));
      }}
    >
      <UnClassifiedKanjis data={items} />
      <ClassifiedKanjis data={items} />
    </DragDropProvider>
  );
}