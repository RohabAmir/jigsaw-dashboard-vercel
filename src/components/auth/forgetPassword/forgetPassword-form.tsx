import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const forgotForm = useForm<z.infer<typeof ForgotSchema>>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  function onForgotSubmit(data: z.infer<typeof ForgotSchema>) {
    console.log("Forgot form submitted:", data);
    toast.success("Password reset email sent!", {
      description: `A reset link has been sent to ${data.email}.`,
    });
    forgotForm.reset();
  }

  return (
    <Form {...forgotForm}>
      <form
        onSubmit={forgotForm.handleSubmit(onForgotSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-extrabold">Forget Password?</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter the email associated with your account, we will send you a
            link to reset your password.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={forgotForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Write your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-2xl">
            Send Email
          </Button>
        </div>
        <div className="mt-4 flex items-center text-sm font-bold justify-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="icon" className=" cursor-pointer">
              <ChevronLeft />
            </Button>
          </Link>
          Back to Login
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      </form>

    </Form>
  );
}
