import { FormFields } from "@/components/shared/form-kit";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function handleImagePreview(
  e: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
  setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>,
  form: UseFormReturn<FormFields>
) {
  const file = e.target.files?.[0];
  setIsImageLoading(true);

  if (file) {
    // Validate file size (e.g., limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size exceeds 10MB limit.");
      setIsImageLoading(false);
      setImagePreview(null);
      form.setValue("bgImage", undefined);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setIsImageLoading(false);
    };
    reader.onerror = () => {
      toast.error("Error loading image.");
      setIsImageLoading(false);
    };
    reader.readAsDataURL(file);
    form.setValue("bgImage", file);
  } else {
    setImagePreview(null);
    setIsImageLoading(false);
    form.setValue("bgImage", undefined);
  }
}
