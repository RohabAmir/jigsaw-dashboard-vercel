import { ModeToggle } from "@/components/global/mode-toggle";
import { ResetPasswordForm } from "./resetPassword-form";

interface ResetPasswordPageConfig {
  title: string;
  logo: string;
  bgImage: string;
  logoLink?: string;
}
interface ResetPasswordPageProps {
  config: ResetPasswordPageConfig;
}

export default function ForgetPasswordPage({ config }: ResetPasswordPageProps) {
  const { title, logo, bgImage, logoLink} = config;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center gap-6 md:justify-between">
          <a href={logoLink} className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-12 items-center justify-center">
              <img src={logo} alt={`${title} Logo`} />
            </div>
          </a>
          {/* <ModeToggle/>  */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ResetPasswordForm />
          </div>
        </div>
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{title} ® 2025 All Right Reserved.</span>
        </div>
      </div>
      <div className="relative hidden h-full flex-1 lg:block">
        <img
          src={bgImage}
          alt="Website Cover Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}