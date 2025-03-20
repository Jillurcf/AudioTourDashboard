// src/component/share/CustomTable.tsx
import React from "react";
import { Table } from "antd";

interface CustomTableProps {
  columns: any[];
  dataSource: any[];
  pagination?: object;
  rowClassName?: (record: any, index: number) => string;
  handlePageChange?: (page: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataSource,
  pagination,
  rowClassName,
  handlePageChange,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        ...pagination,
        onChange: handlePageChange,
      }}
      rowClassName={rowClassName || (() => "hover:bg-transparent")}
    />
  );
};

export default CustomTable;
