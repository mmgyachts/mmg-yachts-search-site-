export const metadata = {
  title: "MMG Yachts — Yacht Intelligence",
  description: "Search, compare, and inquire about production yachts, semi-custom series superyachts, and full custom builds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
