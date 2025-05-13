import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CoverPage from "./CoverPage";

interface DashboardWrapperProps {
  children: ReactNode;
}

// ->> Wrapper component for /dashboard to handle CoverPage logic
export function CoverImageWrapper({ children }: DashboardWrapperProps) {
  const [showCover, setShowCover] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // ->> Show CoverPage when navigating from login to dashboard
  useEffect(() => {
    if (
      isAuthenticated &&
      location.pathname === "/dashboard" &&
      location.state?.fromLogin
    ) {
      setShowCover(true);
    }
  }, [location, isAuthenticated]);

  return (
    <>
      {showCover && (
        <CoverPage
          onAnimationComplete={() => {
            setShowCover(false);
          }}
        />
      )}
      {children}
    </>
  );
}
