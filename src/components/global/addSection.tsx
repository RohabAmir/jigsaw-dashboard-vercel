import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CardTitle } from "../ui/card";

export const sectionOptions = [
  {
    name: "Home Banner Section",
    key: "home-banner",
  },
  {
    name: "Images Slider Section",
    key: "images-slider",
  },
  {
    name: "Product Slider Section",
    key: "product-slider",
  },
  {
    name: "Integration Section",
    key: "integration-slider",
  },
  {
    name: "Banner Section",
    key: "banner-section",
  },
  {
    name: "Mission Section",
    key: "mission-section",
  },
  {
    name: "Content Section",
    key: "content-section",
  },
  {
    name: "Address Section",
    key: "address-section",
  },
  {
    name: "Category Section",
    key: "category-section",
  },
  {
    name: "Blog Section",
    key: "blog-section",
  },
  {
    name: "Newsletter Section",
    key: "newsletter-section",
  },
  {
    name: "Compaign Section",
    key: "compaign-section",
  },
  {
    name: "Feature Section",
    key: "feature-section",
  },
  {
    name: "Carousel Section",
    key: "carousel-section",
  },
  {
    name: "Slider Animation Section",
    key: "slider-animation-section",
  },
  {
    name: "Accordion Section",
    key: "accordion-section",
  },
  {
    name: "Hero Section",
    key: "hero-section",
  },
  {
    name: "Contact Us Form",
    key: "contact-us",
  },
  {
    name: "Request a Demo Form",
    key: "request-demo",
  },
];

const AddUserSchema = z.object({
  addSection: z.string().min(1, { message: "required." }),
});

export function AddSectionForm({
  onSelectSection,
}: {
  onSelectSection: (name: string) => void;
}) {
  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      addSection: "",
    },
  });

  //   function onLoginSubmit(data: z.infer<typeof AddUserSchema>) {
  //     toast.success(`User is added successfully with the role of ${data.role}!`);
  //     addUserForm.reset();
  //     navigate("/dashboard");/
  //   }
  return (
    <>
      <Form {...form}>
        <form
          // onSubmit={addUserForm.handleSubmit(onLoginSubmit)}
          className="w-2/3 space-y-2 ml-6 mb-10"
        >
          <CardTitle className="text-nowrap">Add Section</CardTitle>
          <FormField
            control={form.control}
            name="addSection"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(key) => {
                      field.onChange(key);
                      const opt = sectionOptions.find((o) => o.key === key);
                      if (opt) onSelectSection(opt.name);
                    }}
                  >
                    <SelectTrigger className="lg:w-[250px] cursor-pointer">
                      <SelectValue placeholder="Select a section from the list" />
                    </SelectTrigger>
                    <SelectContent
                      slot="scrollar"
                      className=" flex items-center cursor-pointer"
                    >
                      {sectionOptions?.map((opt) => (
                        <SelectItem
                          className="cursor-pointer"
                          key={opt.key}
                          value={opt.key}
                        >
                          {opt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
