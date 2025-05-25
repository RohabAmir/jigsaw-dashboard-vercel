import { FC } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/global/theme-provider";

// import your two assets
import coverLight from "/assets/images/newJigsawCoverImageWhite.png";
import coverDark from "/assets/images/jigsawCoverImage1.png";

interface CoverPageProps {
  onAnimationComplete: () => void;
}

const CoverPage: FC<CoverPageProps> = ({ onAnimationComplete }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgUrl = isDark ? coverDark : coverLight;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1 }}
      onAnimationComplete={onAnimationComplete}
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center z-[9999] fade-out  ease-in-out"
      style={{ backgroundImage: `url(${bgUrl})` }}
    />
  );
};

export default CoverPage;
