import React, { useState } from 'react';
import { Tabs, Card, Typography, Space, Button, DatePicker, Select, Input, Row, Col, Tag } from 'antd';
import { PlusOutlined, FileExcelOutlined, PrinterOutlined } from '@ant-design/icons';
import TransactionTable from './TransactionTable';
import { mockTransactions } from '../../data/mockTransactions';
import type { TransactionCategory } from '../../types/transaction';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

const TransactionList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Vé');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const getData = (category: string) => {
        return mockTransactions.filter(t => t.category === category);
    };

    // Filter Bar Component
    const FilterBar = () => (
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Space wrap>
                <Text strong>40 / 40 mã phiếu</Text>
                <Select defaultValue="Loại phiếu" style={{ width: 120 }}>
                    <Option value="Loại phiếu">Nhóm theo: Loại phiếu</Option>
                </Select>
                <Select mode="multiple" placeholder="Loại phiếu" style={{ minWidth: 150 }} defaultValue={['Thu', 'Chi']}>
                    <Option value="Thu">Thu</Option>
                    <Option value="Chi">Chi</Option>
                </Select>
                <RangePicker placeholder={['Ngày giao dịch', '']} />
                <Button type="link">+ Thêm lọc</Button>
            </Space>
            <Space>
                <Text>Hiện đính kèm</Text>
                <Search placeholder="Search" style={{ width: 200 }} />
            </Space>
        </div>
    );

    const items = [
        {
            key: 'Vé',
            label: 'Vé',
            children: <TransactionTable data={getData('Vé')} category="Vé" />,
        },
        {
            key: 'Hàng',
            label: 'Hàng',
            children: <TransactionTable data={getData('Hàng')} category="Hàng" />,
        },
    ];

    return (
        <div style={{ background: '#f5f5f5', padding: 24, minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <Space direction="vertical">
                    <Title level={4} style={{ margin: 0 }}>Giao dịch thu chi</Title>
                    <Space size="large">
                        <Card bodyStyle={{ padding: 12 }} style={{ width: 200 }}>
                            <Text type="secondary">Tổng thu</Text>
                            <Title level={4} style={{ margin: 0 }}>349.000.000 ₫</Title>
                        </Card>
                        <Card bodyStyle={{ padding: 12 }} style={{ width: 200 }}>
                            <Text type="secondary">Tổng chi</Text>
                            <Title level={4} style={{ margin: 0 }}>40.000.000 ₫</Title>
                        </Card>
                    </Space>
                </Space>
                <Space>
                    <Button icon={<PrinterOutlined />}>In báo cáo</Button>
                    <Button icon={<FileExcelOutlined />}>Tải về excel</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Thêm phiếu thu chi</Button>
                </Space>
            </div>

            <Card bordered={false}>
                <Tabs defaultActiveKey="Vé" items={items} onChange={handleTabChange} tabBarExtraContent={<FilterBar />} tabBarStyle={{ marginBottom: 24 }} />

                {/* Because FilterBar in tabBarExtraContent doesn't flow like the design exactly (it's usually right aligned), 
                we might need to place it differently if we want exact layout. 
                But for AntD Tabs, placing controls inside is a bit tricky if we want them above the content but below tabs.
                Actually the design shows filters below the tabs 'Vé | Hàng'.
                So let's move FilterBar inside the tab content or just above the table. */
                }
            </Card>
        </div>
    );
};

// Re-implementing structure to match design better: Filters are BELOW tabs.
const TransactionListFixed: React.FC = () => {
    const getData = (category: string) => {
        return mockTransactions.filter(t => t.category === category);
    };

    const FilterBar = () => (
        <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Space wrap>
                <Text strong>40 / 40 mã phiếu</Text>
                <Select defaultValue="type" style={{ width: 150 }} bordered={false}>
                    <Option value="type">Nhóm theo: Loại phiếu</Option>
                </Select>
                <span>|</span>
                <Select mode="multiple" placeholder="Loại phiếu" style={{ minWidth: 150 }} defaultValue={['Thu', 'Chi']} tagRender={(props) => <Tag color={props.value === 'Thu' ? 'green' : 'red'}>{props.label}</Tag>}>
                    <Option value="Thu">Thu</Option>
                    <Option value="Chi">Chi</Option>
                </Select>
                <RangePicker />
                <Button type="link">+ Thêm lọc</Button>
            </Space>
            <Space>
                <Text>Hiện đính kèm</Text>
                <Search placeholder="Search" onSearch={() => { }} style={{ width: 200 }} />
            </Space>
        </div>
    );

    const items = [
        {
            key: 'Vé',
            label: 'Vé',
            children: (
                <>
                    <FilterBar />
                    <TransactionTable data={getData('Vé')} category="Vé" />
                </>
            ),
        },
        {
            key: 'Hàng',
            label: 'Hàng',
            children: (
                <>
                    <FilterBar />
                    <TransactionTable data={getData('Hàng')} category="Hàng" />
                </>
            ),
        },
    ];

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: 24 }}> {/* Adjusted padding */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <Space direction="vertical" size="middle">
                    <Title level={3} style={{ margin: 0 }}>Giao dịch thu chi</Title>
                    <Space>
                        <Card size="small" style={{ width: 180 }}>
                            <Text type="secondary">Tổng thu</Text>
                            <Title level={4} style={{ margin: 0 }}>349.000.000 ₫</Title>
                        </Card>
                        <Card size="small" style={{ width: 180 }}>
                            <Text type="secondary">Tổng chi</Text>
                            <Title level={4} style={{ margin: 0 }}>40.000.000 ₫</Title>
                        </Card>
                    </Space>
                </Space>
                <Space>
                    <Button icon={<PrinterOutlined />}>In báo cáo</Button>
                    <Button icon={<FileExcelOutlined />}>Tải về excel</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Thêm phiếu thu chi</Button>
                </Space>
            </div>

            <Card bordered={false} bodyStyle={{ padding: '0 24px 24px 24px' }}>
                <Tabs defaultActiveKey="Vé" items={items} />
            </Card>
        </div>
    );
}

export default TransactionListFixed;
