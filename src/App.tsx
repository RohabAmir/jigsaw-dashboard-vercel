import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/global/theme-provider";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="min-h-screen">
          <Toaster />
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;