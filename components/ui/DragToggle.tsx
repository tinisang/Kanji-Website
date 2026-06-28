"use client";

import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useKanji } from "@/contexts/Context";



export default function DragToggle() {

    const { dragEnabled, setDragEnabled } = useKanji();

    function onChange(){
        setDragEnabled(!dragEnabled)
    }

  return (
    <div className="flex gap-3 items-center justify-between rounded-xl  bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        

        <div>
          <Label className="font-medium" htmlFor="dragToggle">
            Drag & Drop
          </Label>

        </div>
      </div>

      <Switch
        checked={dragEnabled}
        onCheckedChange={onChange}
        id="dragToggle"
      />
    </div>
  );
}