import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConfigProvider from "antd/lib/config-provider";
import App from "antd/lib/app";
import { Layout } from "@/components/layout/Layout";
import { ClientProvider } from "@/client/ClientProvider";
import { theme } from "@/theme/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "HCL Next App",
  description: "Job interview task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <ClientProvider>
              <App>
                <Layout title="App title">{children}</Layout>
              </App>
            </ClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
