import { useEffect } from 'react'
import './App.css'
import useBackend from './hooks/useBackend'
import IncomeStatement from './components/IncomeStatement'
import Companies from './components/Companies'

const App = () => {
  const { data, loading, companies, dateRange, fetchData, getCompanyBalance } = useBackend()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <div>Loading</div>
  return (
    <div className="App">
      <IncomeStatement
        data={data}
        companies={companies}
        dateRange={dateRange}
        getCompanyBalance={getCompanyBalance}
      />
      <Companies
        data={data}
      />
    </div>
  )
}

export default App
