import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/global/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      className="ml-auto cursor-pointer" 
      variant="ghost"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
