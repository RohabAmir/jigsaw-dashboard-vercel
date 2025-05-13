//* This file defines the routing structure with public and protected routes for the entire project */
//* It uses react-router-dom for routing and protected routes for authentication checks */
//* It also includes a wrapper component for the dashboard to handle cover page logic */

import Login from "@/components/auth/login/login";
import { RouteObject, Navigate } from "react-router-dom";
import ForgetPasswordPage from "@/components/auth/forgetPassword/forgetPassword";
import ResetPasswordPage from "@/components/auth/resetPassword/resetPassword";
import Dashboard from "@/pages/dashboard/page";
import ErroPage from "@/components/global/404error";
import ProtectedRoute from "@/components/global/protectedRoute";
import { CoverImageWrapper } from "@/components/global/CoverImageWrapper";
import AddUserPage from "@/components/addUser/addUser";
import Pages from "@/pages/PagesModule/page";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <Login
        config={{
          title: "Jigsaw",
          logo: "/src/assets/logos/jigsawLogo.svg",
          bgImage: "/src/assets/images/jigsawCoverImage.jpeg",
          logoLink: "https://jigsaw-indol.vercel.app/",
        }}
      />
    ),
  },
  {
    path: "/forget-password",
    element: (
      <ForgetPasswordPage
        config={{
          title: "Jigsaw",
          logo: "/src/assets/logos/jigsawLogo.svg",
          bgImage: "/src/assets/images/jigsawCoverImage.jpeg",
          logoLink: "https://jigsaw-indol.vercel.app/",
        }}
      />
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ResetPasswordPage
        config={{
          title: "Jigsaw",
          logo: "/src/assets/logos/jigsawLogo.svg",
          bgImage: "/src/assets/images/jigsawCoverImage.jpeg",
          logoLink: "https://jigsaw-indol.vercel.app/",
        }}
      />
    ),
  },
  {
    path: "/add-user",
    element: (
      <ProtectedRoute>
        <AddUserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <CoverImageWrapper>
          <Dashboard
            config={{
              title: "Jigsaw.",
              logo: "/src/assets/logos/jigsawLogo.svg",
            }}
          />
        </CoverImageWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/pages",
    element: (
      <ProtectedRoute>
        <CoverImageWrapper>
          <Pages
            config={{
              title: "Jigsaw.",
              logo: "/src/assets/logos/jigsawLogo.svg",
            }}
          />
        </CoverImageWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*" /* ⭐->>> Catch-all route for 404 */,
    element: <ErroPage />,
  },
];

export default routes;
