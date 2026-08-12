import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../lib/cropImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageCropperModalProps {
  imageSrc: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

export function ImageCropperModal({
  imageSrc,
  onCropComplete,
  onCancel,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropCompleteHandler = useCallback(
    (_: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          0,
        );
        if (croppedImage) {
          onCropComplete(croppedImage);
        }
      } catch (e) {
        console.error("Error cropping image", e);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-surface sm:rounded-xl">
        <DialogHeader className="px-6 py-4 border-b border-outline-variant">
          <DialogTitle className="font-headline-md text-headline-md text-primary">
            Crop Image (21:9)
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[50vh] bg-surface-container-highest">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={22.5 / 11}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
          />
        </div>

        <div className="p-6 bg-surface flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-1/2 flex items-center gap-4">
            <span className="material-symbols-outlined text-secondary">
              zoom_out
            </span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
            />
            <span className="material-symbols-outlined text-secondary">
              zoom_in
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 sm:flex-none border-secondary text-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 sm:flex-none bg-brand-blue text-white hover:bg-brand-blue/90"
            >
              Crop & Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
