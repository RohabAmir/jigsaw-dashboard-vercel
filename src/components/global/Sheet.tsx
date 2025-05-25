import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import styled from "styled-components";

const createPageSchema = z
  .object({
    pageName: z.string().min(1, "Page Name is required"),
    slug: z.string().optional(),
    metaTitle: z.string().optional(),
    metaKeywords: z.string().optional(),
    metaDescription: z.string().optional(),
    siteMap: z.boolean(),
    addParentPage: z.enum(["yes", "no"]),
    parentPage: z.string().optional(),
    parentDescription: z.string().optional(),
    parentLogo: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.addParentPage === "yes") {
      if (!data.parentPage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["parentPage"],
          message: "Please select a parent page",
        });
      }
    }
  });

export type CreatePageFormValues = z.infer<typeof createPageSchema>;

interface CreatePageSheetProps {
  trigger: React.ReactNode;
  parentOptions: { label: string; value: string }[];
  onCreate: (values: CreatePageFormValues) => void;
}

export const CreatePageSheet: React.FC<CreatePageSheetProps> = ({
  trigger,
  parentOptions,
  onCreate,
}) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreatePageFormValues>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      pageName: "",
      slug: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      siteMap: false,
      addParentPage: "no",
      parentPage: "",
      parentDescription: "",
      parentLogo: undefined,
    },
  });

  //  Auto-generate slug from pageName
  const pageName = form.watch("pageName");
  useEffect(() => {
    const raw = pageName.trim().toLowerCase();
    const slug = raw.replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    form.setValue("slug", slug);
  }, [pageName, form]);

  const addParent = form.watch("addParentPage");

  function onSubmit(data: z.infer<typeof createPageSchema>) {
    // call back into DataTable:
    onCreate({
      pageName: data.pageName,
      slug: data.slug,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
      siteMap: data.siteMap,
      addParentPage: data.addParentPage,
      parentPage: data.parentPage,
      parentDescription: data.parentDescription,
      parentLogo: data.parentLogo as FileList,
    });

    console.log("Form data:", data);
    toast.success(`${data.pageName} Page created successfully!`);
    form.reset();
    setOpen(false);
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Create Page</SheetTitle>
          <SheetDescription className="py-1">
            Fill out this form to create a new page to your website.
          </SheetDescription>
          <Separator />
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-2"
          >
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="pageName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Write The Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="page-slug" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Write The Meta Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="keyword1, keyword2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sitemap Checkbox */}
            <FormField
              control={form.control}
              name="siteMap"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Include in sitemap?</FormLabel>
                </FormItem>
              )}
            />

            {/* Parent Page Radio */}
            <FormField
              control={form.control}
              name="addParentPage"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Add Parent Page?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="parent-yes" />
                        <Label htmlFor="parent-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="parent-no" />
                        <Label htmlFor="parent-no">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Parent Fields */}
            {addParent === "yes" && (
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="parentPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Parent Page</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose page..." />
                          </SelectTrigger>
                          <SelectContent>
                            {parentOptions?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe this page" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <SheetFooter className="mt-auto flex gap-2">
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
