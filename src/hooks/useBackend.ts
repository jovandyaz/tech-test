import { useState, useCallback } from 'react'
import { Invoice } from '../types/invoice'
import { getData } from '../utils/helpers'
import { isAfter, isBefore, addDays, subDays, getDaysInMonth } from 'date-fns'

const useBackend = () => {
    const [data, setData] = useState<Invoice[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [companies, setCompanies] = useState<string[]>([])
    const [dateRange, setDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' })
    const [tmpData, setTmpData] = useState<Invoice[]>([])

    const getCompanies = (invoices: Invoice[]) => {
        const issuers = invoices.map(i => i.issuerId)
        const receivers = invoices.map(i => i.receiverId)
        setCompanies([...new Set([...issuers, ...receivers])].sort((a: any, b: any) => a - b))
    }

    const getRageDate = (invoices: Invoice[]) => {
        const start = invoices.reduce((min: any, i: Invoice) => {
            if (isBefore(new Date(i.paymentDate), new Date(min))) {
                return i.paymentDate
            }
            return min
        }, invoices[0].paymentDate)
        const end = invoices.reduce((max: any, i: Invoice) => {
            if (isAfter(new Date(i.paymentDate), new Date(max))) {
                return i.paymentDate
            }
            return max
        }, invoices[0].paymentDate)
        setDateRange({ start, end })
    }

    const getInvoicesAmount = (companyId: string, fromDate: string, n: number) => {
        return [...tmpData]
            .filter(data => [data.issuerId].includes(companyId)
                && isAfter(new Date(data.paymentDate), new Date(fromDate))
                && isBefore(new Date(data.paymentDate), addDays(new Date(fromDate), n)))
            .reduce((acc, cont) => +acc + +cont.amount, 0)
    }
    const getExpensesAmount = (companyId: string, fromDate: string, n: number) => {
        return [...tmpData]
            .filter(data => [data.receiverId].includes(companyId)
                && isAfter(new Date(data.paymentDate), new Date(fromDate))
                && isBefore(new Date(data.paymentDate), addDays(new Date(fromDate), n)))
            .reduce((acc, cont) => +acc + +cont.amount, 0)
    }

    const fetchData = useCallback(async () => {
        setLoading(true)
        const invoices: Invoice[] = await getData()
        getCompanies(invoices)
        getRageDate(invoices)
        setData(invoices)
        setTmpData(invoices)
        setLoading(false)
    }, [])

    const getCompanyBalance = (companyId: string, fromDate: string,) => {
        const PERIOD_DAYS = [7, 14, 30]
        const companyBalance = []
        for (const n of PERIOD_DAYS) {
            const invoicesAmount = getInvoicesAmount(companyId, fromDate, n)
            const expensesAmount = getExpensesAmount(companyId, fromDate, n)
            const balanceAmount = invoicesAmount - expensesAmount

            companyBalance.push({ invoicesAmount, expensesAmount, balanceAmount, days: n })
        }
        setData([...tmpData]
            .filter(data => [data.issuerId, data.receiverId].includes(companyId)
                && isAfter(new Date(data.paymentDate), new Date(fromDate))
                && isBefore(new Date(data.paymentDate), addDays(new Date(fromDate), PERIOD_DAYS[2])))
        )
        return companyBalance
    }

    return { data, loading, companies, dateRange, fetchData, getCompanyBalance }
}

export default useBackend