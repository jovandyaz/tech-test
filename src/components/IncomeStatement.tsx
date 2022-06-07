import React, { FC, useState } from 'react'
import { Invoice } from '../types/invoice'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, DatePicker, Row, Select, Statistic, Table } from 'antd';

type IncomeStatementProps = {
    data: Invoice[]
    companies: string[]
    getCompanyBalance: (company: string) => { invoices: number, expenses: number, balance: number }
}

const IncomeStatement: FC<IncomeStatementProps> = ({
    data,
    companies,
    getCompanyBalance,
}) => {
    const { Option } = Select;
    const [companyBalance, setCompanyBalance] = useState({ invoices: 0, expenses: 0, balance: 0 })

    const handleCompanyChange = (value: string) => {
        const { invoices, expenses, balance } = getCompanyBalance(value);
        setCompanyBalance({ invoices, expenses, balance });
    };

    const handleDateRangeChange = (value: string) => {

    };

    return (
        <>
            <div>IncomeStatement</div>
            <Select defaultValue="Company" style={{ width: 120 }} onChange={handleCompanyChange}>
                {companies.map(company => <Option key={company} value={company}>{company}</Option>)}
            </Select>
            <DatePicker />
            <Select defaultValue="Date Range" style={{ width: 120 }} onChange={handleDateRangeChange}>
                <Option value="7">7 días</Option>
                <Option value="14">14 días</Option>
                <Option value="30">30 días</Option>
            </Select>
            <Table dataSource={data} columns={COLUMNS} />
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Incomes"
                            value={companyBalance.invoices}
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
                            value={companyBalance.expenses}
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
                            value={companyBalance.balance}
                            precision={2}
                            valueStyle={{ color: companyBalance.balance > 0 ? '#3f8600' : '#cf1322' }}
                            prefix="$"
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

const COLUMNS = [
    {
        title: 'invoiceId',
        dataIndex: 'invoiceId',
        key: 'invoiceId',
    },
    {
        title: 'issueDate',
        dataIndex: 'issueDate',
        key: 'issueDate',
    },
    {
        title: 'paymentDate',
        dataIndex: 'paymentDate',
        key: 'paymentDate',
    },
    {
        title: 'issuerId',
        dataIndex: 'issuerId',
        key: 'issuerId',
    },
    {
        title: 'receiverId',
        dataIndex: 'receiverId',
        key: 'receiverId',
    },
    {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount',
    },
]
export default IncomeStatement