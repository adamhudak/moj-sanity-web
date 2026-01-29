import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Odstránili sme lang="sk", ten sa nastaví vo vnútornom layoute
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}