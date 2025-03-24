import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";

export default function AppProvider({ children }) {
  
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
}
