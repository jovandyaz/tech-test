import React, { FC } from 'react'
import { Invoice } from '../types/invoice'

type CompaniesProps = {
    data: Invoice[]
}

const Companies: FC<CompaniesProps> = (invoices) => {
    return (
        <div>Companies</div>
    )
}

export default Companies