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
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { title } = props;

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onLoginSubmit(data: z.infer<typeof LoginSchema>) {
    // Simulate without API call
    const mockToken = "mock-jwt-token-" + Math.random().toString(36).slice(2);
    login(mockToken);
    navigate("/dashboard", { state: { fromLogin: true } }); // ->> Pass fromLogin state flag
    toast.success("Logged in successfully!");
    loginForm.reset();
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-extrabold text-nowrap flex flex-row  justify-center">
            Welcome to {title} Dashboard
          </h1>
          <CardDescription>
            Login & simplify your website management.
          </CardDescription>
        </div>
        <div className="grid gap-6">
          <FormField
            control={loginForm.control}
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
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <Link className="ml-auto" to="/forget-password">
                  <Button
                    variant="link"
                    className="text-sm text-muted-foreground cursor-pointer"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </Link>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </form>
    </Form>
  );
}
