import { useContext } from "react";
import { AuthenticationProviderContext } from "@/components/authentication-provider.tsx";

export const useAuthentication = () => {
  const context = useContext(AuthenticationProviderContext);

  if (context === undefined)
    throw new Error("useAuthentication must be used within a ThemeProvider");

  return context;
};
