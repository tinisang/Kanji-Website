import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditableText } from "./EditableText";
export default function KanjiDetailModal() {
  return (
    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent  showCloseButton={false}  className="!max-w-5xl p-0 font-inherit">
   
    <div className="overflow-hidden rounded-lg border-l-4 border-l-lime-500">
      {/* Header */}
      <div className="flex bg-neutral-50 p-6">
        {/* Kanji */}
        <div className="w-32 shrink-0 text-center">
          <div className="text-8xl font-bold leading-none">
            漢
          </div>

          <EditableText
  defaultValue="HÁN"
  className="mt-4 text-3xl font-semibold text-neutral-400"
/>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex gap-6">
            <span className="w-24 font-semibold">
              Kunyomi
            </span>

            <div className="flex flex-wrap gap-4">
              <span>みと</span>
              <span>したため</span>
            </div>
          </div>

          <div className="flex gap-6">
            <span className="w-24 font-semibold">
              Onyomi
            </span>

            <span>カン</span>
          </div>

          <div className="flex gap-6">
            <span className="w-24 font-semibold">
              Số nét
            </span>

            <EditableText defaultValue="13" />
          </div>
        </div>
      </div>

      {/* Vocabulary */}
      <div className="space-y-4 border-t p-6">
        <div className="flex items-center gap-4">
          <EditableText
  defaultValue="漢字"
  className="text-3xl font-bold"
/>

          <EditableText
  defaultValue="(かんじ)"
  className="text-lg"
/>

          <EditableText defaultValue="Hán tự" />
        </div>

        
        <div className="flex items-center gap-4">
          <EditableText
  defaultValue="漢字"
  className="text-3xl font-bold"
/>

          <EditableText
  defaultValue="(かんじ)"
  className="text-lg"
/>

          <EditableText defaultValue="Hán tự" />
        </div>

        
        <div className="flex items-center gap-4">
          <EditableText
  defaultValue="漢字"
  className="text-3xl font-bold"
/>

          <EditableText
  defaultValue="(かんじ)"
  className="text-lg"
/>

          <EditableText defaultValue="Hán tự" />
        </div>

        

      </div>

      {/* Description */}
      <div className="bg-lime-50 p-6">
        <h3 className="mb-3 ">
          Ghi chú
        </h3>

        <EditableText
  defaultValue="Chữ 漢 mang nghĩa Hán, thường dùng để chỉ dân tộc Hán..."
  className="block leading-7 text-neutral-700"
  onSave={(value)=>{
    console.log(value)
  }}
/>
      </div>
    </div>
      
  </DialogContent>
</Dialog>
    
  );
}