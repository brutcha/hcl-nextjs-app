import { FC, PropsWithChildren } from "react";
import AntdLayout, { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { serverClient } from "@/client/serverClient";
import styles from "./Layout.module.css";

interface LayoutProps extends PropsWithChildren<{}> {
  title: React.ReactNode;
}

export const Layout: FC<LayoutProps> = async ({ children, title }) => {
  const health = await serverClient.healthcheck();

  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <Title>{title}</Title>
        {health}
      </Header>
      <Content className={styles.content}>{children}</Content>
    </AntdLayout>
  );
};
