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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"></div>
      <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600">Total Amount</div>
          <div className="text-2xl font-bold text-blue-800">
            {formatCurrency(totalAmount)}
          </div>
        </div>
      </div><div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => handleSort('createdAt')}
                  >
                    <Calendar size={16} />
                    Date
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => handleSort('description')}
                  >
                    <Receipt size={16} />
                    Description
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  <button
                    className="flex items-center gap-2 ml-auto"
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                    <ArrowUpDown size={16} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {transaction.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}