import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
  setCropper: (cropper: Cropper) => void;
  imagePreview: string;
}

export default function PhotoWidgetCropper({
  setCropper,
  imagePreview,
}: Props) {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".image-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
}
