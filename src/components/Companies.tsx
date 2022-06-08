import React, { FC } from 'react'
import {
    Typography,
} from 'antd';
import { Invoice } from '../types/invoice'

type CompaniesProps = {
    data: Invoice[]
}

const { Title } = Typography;

const Companies: FC<CompaniesProps> = (invoices) => {
    return (
        <>
            <Title level={1}>Companies Component</Title>
            <div>WIP...</div>
        </>
    )
}

export default Companies