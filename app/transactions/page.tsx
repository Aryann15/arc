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
  }
}