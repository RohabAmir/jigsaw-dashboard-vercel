import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { handleImagePreview } from "@/utils/handleImagePreview";

const formSchema = z.object({
  title_en: z.string().min(1, "Title is required"),
  title_ar: z.string().min(1, "Title is required"),
  subtitle_en: z.string().optional(),
  subtitle_ar: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  isBtn: z.boolean(),
  bgImage: z.any().optional(),
});

export type FormFields = z.infer<typeof formSchema>;

export function FormKit({
  sectionName,
  onCancel,
  onSubmit,
}: {
  sectionName: string;
  onCancel: () => void;
  onSubmit: (data: FormFields) => void;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_en: "",
      title_ar: "",
      subtitle_en: "",
      subtitle_ar: "",
      description_en: "",
      description_ar: "",
      isBtn: false,
      bgImage: undefined,
    },
  });

  function onSubmitHandler(data: z.infer<typeof formSchema>) {
    console.log("Form data:", data);
    toast.success(`${sectionName} created successfully!`);
    onSubmit(data);
  }

  return (
    <Card className="w-auto mx-8 xl:mx-28 pt-0">
      <CardHeader
        style={{ background: "var(--add-user-bg)" }}
        className=" p-4 text-white rounded-t-md"
      >
        <CardTitle>{sectionName}</CardTitle>
        <CardDescription className="text-white">
          Fill out the form to add this section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-6 py-2"
          >
            <div className="grid gap-6">
              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (en)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write The Title in english"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (ar)</FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          placeholder="اكتب العنوان بالعربية"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subtitle_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-Title (en)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write The Subtitle in english"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-Title (ar)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="اكتب الترجمة باللغة العربية"
                          {...field}
                          dir="rtl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (en)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write the description in english..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (ar)</FormLabel>
                      <FormControl>
                        <Textarea
                          dir="rtl"
                          placeholder="اكتب الوصف باللغة العربية..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="bgImage"
              render={() => (
                <FormItem>
                  <FormLabel>Select the Background Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      onChange={(e) =>
                        handleImagePreview(
                          e,
                          setImagePreview,
                          setIsImageLoading,
                          form
                        )
                      }
                    />
                  </FormControl>
                  <div className="mt-2">
                    {isImageLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin text-[#AC2785]" />
                        <p className="text-sm text-white">Loading image...</p>
                      </div>
                    ) : imagePreview ? (
                      <div>
                        <p className="text-sm font-medium">Image Preview:</p>
                        <img
                          src={imagePreview}
                          alt="Selected background"
                          className="mt-2 w-80 rounded-lg"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No image selected</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBtn"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>is Button?</FormLabel>
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between mt-6">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
