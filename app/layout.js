import Providers from "./provider";

function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
export default RootLayout;
