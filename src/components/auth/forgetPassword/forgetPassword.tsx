import { ModeToggle } from "@/components/global/mode-toggle";
import { ForgetPasswordForm } from "./forgetPassword-form";
import { useTheme } from "@/components/global/theme-provider";

interface ForgetPasswordPageConfig {
  title: string;
  logo: string;
  bgImageDark: string;
  bgImageWhite: string;
  logoLink?: string;
}

interface ForgetPasswordPageProps {
  config: ForgetPasswordPageConfig;
}

export default function ForgetPasswordPage({
  config,
}: ForgetPasswordPageProps) {
  const { title, logo, bgImageWhite, bgImageDark, logoLink } = config;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center gap-6 md:justify-between">
          <a href={logoLink} className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-12 items-center justify-center">
              <img src={logo} alt={`${title} Logo`} />
            </div>
          </a>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgetPasswordForm />
          </div>
        </div>
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{title} ® 2025 All Right Reserved.</span>
        </div>
      </div>
      <div className="relative hidden h-full flex-1 lg:block overflow-hidden">
        <img
          src={isDark ? bgImageDark : bgImageWhite}
          alt="Website Cover Image"
          className="
      absolute inset-0 h-full w-full object-cover
      transition-opacity duration-500 ease-in-out
    "
          style={{
            opacity: 0,
            animation: "fadeIn 0.5s forwards",
          }}
        />
      </div>
    </div>
  );
}
