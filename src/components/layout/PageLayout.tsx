import { FC, HTMLAttributes, ReactNode } from "react";
import Flex from "antd/lib/flex";
import Title from "antd/lib/typography/Title";
import Space from "antd/lib/space";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  actions: ReactNode[];
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  title,
  actions,
  ...props
}) => {
  return (
    <div {...props}>
      <Flex justify="space-between" className={styles.header}>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
        <Space wrap>{actions}</Space>
      </Flex>
      {children}
    </div>
  );
};
