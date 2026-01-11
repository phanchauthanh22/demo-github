import React, { useState } from 'react';
import { Table, Tag, Typography, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Transaction, TicketTransaction, GoodsTransaction, TransactionCategory } from '../../types/transaction';
import { FormOutlined, LinkOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface TransactionTableProps {
    data: Transaction[];
    category: TransactionCategory;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ data, category }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // --- Shared Columns ---
    const sharedColumns: ColumnsType<Transaction> = [
        {
            title: 'Mã phiếu',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Loại phiếu',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'Chi' ? 'volcano' : 'green'}>{type}</Tag>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (cat) => <Tag color="blue">{cat}</Tag>,
        },
        {
            title: 'Ngày giao dịch',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            width: 150,
            render: (text) => {
                if (!text || text === '-') return '-';
                return (
                    <Space direction="vertical" size={0}>
                        <Text>{text.split(' ')[0]}</Text>
                        <Text type="secondary" style={{ fontSize: '11px' }}>{text.split(' ')[1]}</Text>
                    </Space>
                )
            }
        },
        {
            title: 'Từ',
            dataIndex: 'from',
            key: 'from',
            render: (text) => <Text style={{ whiteSpace: 'pre-line' }}>{text}</Text>,
        },
        {
            title: 'Đến',
            dataIndex: 'to',
            key: 'to',
            render: (text) => <Text style={{ whiteSpace: 'pre-line' }}>{text}</Text>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            render: (value, record) => (
                <Text type={record.type === 'Chi' ? 'danger' : 'success'} strong>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                </Text>
            ),
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (text) => (
                text !== '-' ? <Tag color="geekblue">{text}</Tag> : '-'
            )
        },
    ];

    // --- Specific Columns ---
    const ticketColumns: ColumnsType<Transaction> = [
        {
            title: 'Mã vé',
            dataIndex: 'ticketCode',
            key: 'ticketCode',
            render: (text) => text !== '-' ? <a>{text} <LinkOutlined /></a> : '-',
        },
        {
            title: 'Loại ghế',
            dataIndex: 'seatType',
            key: 'seatType',
            render: (text) => text !== '-' ? <Tag>{text}</Tag> : '-',
        },
        {
            title: 'Ngày đặt vé',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'departureDate',
            key: 'departureDate',
        },
    ];

    const goodsColumns: ColumnsType<Transaction> = [
        {
            title: 'Mã hàng',
            dataIndex: 'goodsCode',
            key: 'goodsCode',
            render: (text) => text !== '-' ? <a>{text} <LinkOutlined /></a> : '-',
        },
        {
            title: 'Khách gửi hàng',
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: 'Tên hàng',
            dataIndex: 'goodsName',
            key: 'goodsName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color="green">{status}</Tag>
        },
        {
            title: 'Ngày gửi hàng',
            dataIndex: 'sentDate',
            key: 'sentDate',
        },
        {
            title: 'Ngày giao hàng',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
        },

    ];

    // --- Common Trailing Columns ---
    const trailingColumns: ColumnsType<Transaction> = [
        {
            title: 'Chuyến',
            dataIndex: 'trip',
            key: 'trip',
            render: (text) => <Text style={{ whiteSpace: 'pre-line' }}>{text}</Text>,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            render: (text) => text || '-',
        },
    ];

    let columns = [...sharedColumns];
    if (category === 'Vé') {
        columns = [...columns, ...ticketColumns];
    } else if (category === 'Hàng') {
        columns = [...columns, ...goodsColumns];
    }
    columns = [...columns, ...trailingColumns];


    return (
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500 }}
            rowClassName={(record) => (record.code === 'Chi' || record.code === 'Thu') ? 'group-row-summary' : ''}
        />
    );
};

export default TransactionTable;
