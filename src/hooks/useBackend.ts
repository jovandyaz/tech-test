import { useState, useCallback } from 'react'
import { Invoice } from '../types/invoice'
import { getData } from '../utils/helpers'

const useBackend = () => {
    const [data, setData] = useState<Invoice[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [companies, setCompanies] = useState<string[]>([])
    const [tmpData, setTmpData] = useState<Invoice[]>([])

    const getCompanies = (invoices: Invoice[]) => {
        const issuers = invoices.map(i => i.issuerId)
        const receivers = invoices.map(i => i.receiverId)
        setCompanies([...new Set([...issuers, ...receivers])])
    }

    const fetchData = useCallback(async () => {
        setLoading(true)
        const invoices: Invoice[] = await getData()
        getCompanies(invoices)
        setData(invoices)
        setTmpData(invoices)
        setLoading(false)
    }, [])

    const getCompanyBalance = (companyId: string) => {
        const invoices = [...tmpData].filter(data => [data.issuerId].includes(companyId)).reduce((acc, cont) => +acc + +cont.amount, 0)
        const expenses = [...tmpData].filter(data => [data.receiverId].includes(companyId)).reduce((acc, cont) => +acc + +cont.amount, 0)
        const balance = invoices - expenses

        setData([...tmpData].filter(data => [data.issuerId, data.receiverId].includes(companyId)))
        return { invoices, expenses, balance }
    }

    return { data, loading, companies, fetchData, getCompanyBalance }
}

export default useBackend