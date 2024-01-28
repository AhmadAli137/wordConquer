import "./theme-config.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
// import NavBar from "./NabBar";


export const metadata = {
  title: "Word Conquer",
  description: "A tool to help you learn to spell words.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "CustomFont" }}>
        <Theme appearance="light" accentColor="violet">
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  );
}