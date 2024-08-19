import { Layout } from "@/components";
import "../styles/globals.scss";

export const metadata = {
  title: "Nextjs CMS Blog",
  description: "Made with Next.js, GraphQL, and Tailwind CSS ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
