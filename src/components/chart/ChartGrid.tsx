import { FC, HTMLAttributes } from "react";
import styles from "./ChartGrid.module.css";

export interface ChartGridProp extends HTMLAttributes<HTMLDivElement> {}

export const ChartGrid: FC<ChartGridProp> = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.grid}>
      {children}
    </div>
  );
};
