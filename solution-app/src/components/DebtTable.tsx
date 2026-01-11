import React, { useState } from 'react';
import { Table, Tag, Button, Space, Typography, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

// --- Types ---
interface CategoryBreakdown {
  category: string;
  amount: number;
}

interface DataType {
  key: string;
  employeeName: string;
  employeeId: string;
  totalDebt: number;
  aging: number; // days
  breakdown: CategoryBreakdown[];
  lastCollectionDate: string;
}

// --- Dummy Data ---
const data: DataType[] = [
  {
    key: '1',
    employeeName: 'Nguyen Van A',
    employeeId: 'NV001',
    totalDebt: 5000000,
    aging: 15,
    breakdown: [
      { category: 'Vé', amount: 3000000 },
      { category: 'Hàng', amount: 2000000 },
    ],
    lastCollectionDate: '2023-10-25',
  },
  {
    key: '2',
    employeeName: 'Tran Thi B',
    employeeId: 'NV002',
    totalDebt: 1200000,
    aging: 2,
    breakdown: [
      { category: 'Sửa chữa', amount: 1200000 },
    ],
    lastCollectionDate: '2023-10-27',
  },
  {
    key: '3',
    employeeName: 'Le Van C',
    employeeId: 'NV003',
    totalDebt: 8500000,
    aging: 45,
    breakdown: [
      { category: 'Vé', amount: 5000000 },
      { category: 'Khác', amount: 3500000 },
    ],
    lastCollectionDate: '2023-10-20',
  },
];

const DebtTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.employeeId}</Text>
        </Space>
      ),
    },
    {
      title: 'Tổng nợ',
      dataIndex: 'totalDebt',
      key: 'totalDebt',
      sorter: (a, b) => a.totalDebt - b.totalDebt,
      render: (value) => (
        <Text type="danger" strong>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
        </Text>
      ),
    },
    {
      title: 'Aging (Ngày)',
      dataIndex: 'aging',
      key: 'aging',
      sorter: (a, b) => a.aging - b.aging,
      render: (days) => {
        let color = 'green';
        if (days > 30) color = 'red';
        else if (days > 7) color = 'orange';
        return (
          <Tag icon={<ClockCircleOutlined />} color={color}>
            {days} ngày
          </Tag>
        );
      },
    },
    {
      title: 'Chi tiết danh mục',
      dataIndex: 'breakdown',
      key: 'breakdown',
      render: (breakdown: CategoryBreakdown[]) => (
        <Space wrap>
          {breakdown.map((item) => (
            <Tooltip title={`${new Intl.NumberFormat('vi-VN').format(item.amount)} VND`} key={item.category}>
              <Tag color="geekblue">{item.category}</Tag>
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: 'Lần thu gần nhất',
      dataIndex: 'lastCollectionDate',
      key: 'lastCollectionDate',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" size="small" icon={<DollarCircleOutlined />}>
          Thu tiền
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" disabled={!selectedRowKeys.length} loading={false}>
          Thu tiền ({selectedRowKeys.length})
        </Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} nhân viên` : ''}
        </span>
      </div>
      <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={data} 
        expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>Chi tiết các khoản nợ của {record.employeeName} sẽ hiển thị ở đây (View B).</p>,
        }}
      />
    </div>
  );
};

export default DebtTable;
