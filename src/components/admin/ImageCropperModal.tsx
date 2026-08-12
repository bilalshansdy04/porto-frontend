import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../lib/cropImage";

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
    (croppedArea: any, croppedAreaPixels: any) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-headline-md text-headline-md text-primary">
            Crop Image (21:9)
          </h2>
          <button
            onClick={onCancel}
            className="text-secondary hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

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
            <button
              onClick={onCancel}
              className="flex-1 sm:flex-none px-6 py-2 border border-secondary text-secondary rounded-lg font-body-md hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 bg-brand-blue text-white rounded-lg font-body-md hover:opacity-90 transition-opacity"
            >
              Crop & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
