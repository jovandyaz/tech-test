import React, { FC, useState } from 'react'
import {
    DatePicker,
    Button,
    Tooltip,
    Select,
    Table,
    Typography,
    DatePickerProps,
    SelectProps
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { SearchOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import moment from 'moment';
import { Invoice } from '../types/invoice'
import Statistics from './Statistics';

const { Title } = Typography;
const { Option } = Select;

type IncomeStatementProps = {
    data: Invoice[]
    companies: string[]
    dateRange: { start: any, end: any }
    getCompanyBalance: (company: string, fromDate: string) => any
}

const IncomeStatement: FC<IncomeStatementProps> = ({
    data,
    companies,
    dateRange,
    getCompanyBalance,
}) => {
    const { start, end } = dateRange
    const [selectedCompany, setSelectedCompany] = useState('')
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [companyBalance, setCompanyBalance] = useState([])

    const handleCompanyChange: SelectProps['onChange'] = (company: string) => {
        setSelectedCompany(company);
    };

    const disabledDate: RangePickerProps['disabledDate'] = current => {
        return current && current >= moment(new Date(end));
    };

    const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString)
    };

    const handleSearch = () => {
        const companyBalanceData = getCompanyBalance(selectedCompany, fromDate);
        setCompanyBalance(companyBalanceData);
    };

    return (
        <>
            <Title level={1}>IncomeStatement Component</Title>
            <Select defaultValue="Company" style={{ width: 120 }} onChange={handleCompanyChange}>
                {companies.map(company => <Option key={company} value={company}>{company}</Option>)}
            </Select>
            <DatePicker
                defaultValue={moment()}
                disabledDate={disabledDate}
                onChange={handleChange}
            />
            <Tooltip title="search">
                <Button
                    type="primary"
                    shape="circle"
                    onClick={handleSearch}
                    disabled={!selectedCompany}
                    icon={<SearchOutlined />}
                />
            </Tooltip>
            <Table dataSource={data} columns={COLUMNS} />
            {!!companyBalance.length && companyBalance.map(cb => <Statistics companyBalance={cb} />)}
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