import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Typography, Card, Col, Row, Statistic } from 'antd';

const { Title } = Typography;

const Statistics = ({
    companyBalance = { invoicesAmount: 0, expensesAmount: 0, balanceAmount: 0, days: 0 }
}) => {
    const { invoicesAmount, expensesAmount, balanceAmount, days } = companyBalance;
    return (
        <>
            <Title level={4}>{`${days} Days`}</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Incomes"
                            value={invoicesAmount}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix="$"
                            suffix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Expenses"
                            value={expensesAmount}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix="$"
                            suffix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Balance"
                            value={balanceAmount}
                            precision={2}
                            valueStyle={{ color: balanceAmount > 0 ? '#3f8600' : '#cf1322' }}
                            prefix="$"
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Statistics