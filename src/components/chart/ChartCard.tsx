import { FC, useMemo } from "react";
import Card, { CardProps } from "antd/lib/card";
import Flex from "antd/lib/flex";
import Avatar from "antd/lib/avatar/avatar";
import Button from "antd/lib/button/button";
import { CommentOutlined } from "@ant-design/icons";
import styles from "./ChartCard.module.css";

export interface ChartCardProps extends Omit<CardProps, "actions"> {}

export const ChartCard: FC<ChartCardProps> = ({
  children,
  loading,
  ...props
}) => {
  const avatarSrc = useMemo(() => {
    return `https://i.pravatar.cc/38?img=${Math.floor(Math.random() * 69)}`;
  }, []);

  return (
    <Card
      className={styles.card}
      classNames={{
        header: styles.cardHeader,
        body: styles.cardBody,
        actions: styles.cardActions,
      }}
      loading={loading}
      actions={[
        <Flex
          className={styles.cardAction}
          justify="space-between"
          align="center"
          gap={24}
          key="footer"
        >
          <Avatar src={loading ? undefined : avatarSrc} size="large" />
          <Button
            icon={<CommentOutlined className={styles.icon} />}
            type="text"
            iconPosition="end"
            shape="round"
            size="large"
            loading={loading}
          >
            3
          </Button>
        </Flex>,
      ]}
      {...props}
    >
      {children}
    </Card>
  );
};
