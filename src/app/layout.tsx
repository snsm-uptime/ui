import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className="flex h-screen">
          <Sidebar></Sidebar>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
}
