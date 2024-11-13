"use client"
import React, { useState, useEffect } from 'react'
export default function TransactionPage() {

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await fetch('/api/bills')
            const data = await response.json()
            setTransactions(data) //tbd
            setFilteredTransactions(data) //tbd
            setIsLoading(false) //tbd
          } catch (error) {
            console.error('Error fetching transactions:', error)
            setIsLoading(false) //tbd
          }
        }
    
        fetchTransactions()
      }, [])
      const categories = ['all', ...new Set(transactions.map(t => t.category?.name || 'Uncategorized'))]

      const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)

  const formatCurrency = (amount: number) => {
    return `₹${(amount).toLocaleString('en-IN')}`
    const handleSort = (key: keyof Transaction) => {
        setSortConfig({
          key,
          direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        })
      }

      const exportToCSV = () => {
        const headers = ['Date', 'Description', 'Category', 'Amount']
        const csvData = filteredTransactions.map(t => [
          format(new Date(t.createdAt), 'yyyy-MM-dd'),
          t.description,
          t.category?.name || 'Uncategorized',
          formatCurrency(t.amount)
        ])
    
        const csvContent = [
          headers.join(','),
          ...csvData.map(row => row.join(','))
        ].join('\n')
    
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      }
   return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-500">
            Showing {filteredTransactions.length} transactions
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>
   ) 
  }
}