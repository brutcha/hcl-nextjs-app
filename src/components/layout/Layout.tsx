import { FC, PropsWithChildren } from "react";
import AntdLayout, { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import styles from "./Layout.module.css";

interface LayoutProps extends PropsWithChildren<{}> {
  title: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <Title>{title}</Title>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </AntdLayout>
  );
};
