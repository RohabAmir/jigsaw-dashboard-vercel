import { motion } from "framer-motion";

import { FC } from "react";

interface CoverPageProps {
  onAnimationComplete: () => void;
}

const CoverPage: FC<CoverPageProps> = ({ onAnimationComplete }) => {
return (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        onAnimationComplete={onAnimationComplete}
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center z-[9999] fade-out  ease-in-out"
        style={{
            backgroundImage: `url(/assets/images/jigsawCoverImage1.png)`,
        }}
    />
);
};

export default CoverPage;
