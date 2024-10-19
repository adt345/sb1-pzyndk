import React, { createContext, useState, useEffect, useContext } from 'react';

export interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions([...transactions, newTransaction]);
  };

  const editTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(transactions.map(t => t.id === id ? { ...updatedTransaction, id } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};