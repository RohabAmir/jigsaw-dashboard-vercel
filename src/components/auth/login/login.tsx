import { LoginForm } from "@/components/auth/login/login-form";
import { ModeToggle } from "@/components/global/mode-toggle";
import { useTheme } from "@/components/global/theme-provider";

interface LoginPageConfig {
  title: string;
  logo: string;
  bgImageDark: string;
  bgImageWhite: string;
  logoLink?: string;
}

interface LoginPageProps {
  config: LoginPageConfig;
}

export default function LoginPage({ config }: LoginPageProps) {
  const { title, logo, bgImageDark, bgImageWhite, logoLink } = config;
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
            <LoginForm title={title} />
          </div>
        </div>
        <div className="flex text-nowrap  w-full justify-between text-xs font-semibold text-muted-foreground">
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

//* -> to use it later if required style={{ background:"linear-gradient(50deg, oklch(0.36 0.1206 275.57) 0%, oklch(0.52 0.1919 342.72)  100%"}}
