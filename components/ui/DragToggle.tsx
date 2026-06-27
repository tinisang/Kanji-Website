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
    <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3 mb-8">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-neutral-100 p-2">
          <GripVertical className="h-4 w-4 text-neutral-600" />
        </div>

        <div>
          <Label className="font-medium" htmlFor="dragToggle">
            Drag & Drop
          </Label>

          <p className="text-sm text-neutral-500">
            {dragEnabled
              ? "Reorder is enabled"
              : "Reorder is disabled"}
          </p>
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