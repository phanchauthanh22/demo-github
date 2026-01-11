import { Layout, Typography, theme, Tabs } from 'antd';
import DebtTable from './components/DebtTable';
import TransactionList from './components/transaction/TransactionList';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: 'CÔNG NỢ (View A)',
      children: (
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <DebtTable />
        </div>
      ),
    },
    {
      key: '2',
      label: 'GIAO DỊCH THU CHI (Task Mới)',
      children: <TransactionList />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          BMS - Quản lý Công Nợ
        </Title>
      </Header>
      <Content style={{ padding: '0 48px', marginTop: '24px' }}>
        <Tabs defaultActiveKey="2" items={items} type="card" />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        BMS ©{new Date().getFullYear()} Created by Vexere
      </Footer>
    </Layout>
  );
};

export default App;
