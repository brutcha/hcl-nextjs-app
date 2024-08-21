import { FC, PropsWithChildren } from "react";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import styles from "./MainLayout.module.css";

interface LayoutProps extends PropsWithChildren<{}> {
  title: React.ReactNode;
}

export const MainLayout: FC<LayoutProps> = async ({ children, title }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title>{title}</Title>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};
