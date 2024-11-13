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
    
}