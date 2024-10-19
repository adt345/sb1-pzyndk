import React, { useState } from 'react';
import { useTransactions, Transaction } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Edit2, Trash2 } from 'lucide-react';

const TransactionList: React.FC = () => {
  const { transactions, editTransaction, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const filteredTransactions = transactions.filter(t => t.date.startsWith(selectedMonth));

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTransaction) {
      editTransaction(editingTransaction.id, editingTransaction);
      setEditingTransaction(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: 'bg-red-500',
      Transportation: 'bg-blue-500',
      Shopping: 'bg-green-500',
      Entertainment: 'bg-yellow-500',
      Bills: 'bg-purple-500',
      Health: 'bg-pink-500',
      Education: 'bg-indigo-500',
      Other: 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Month</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 border-b last:border-b-0">
                {editingTransaction?.id === transaction.id ? (
                  <form onSubmit={handleSave} className="space-y-2">
                    <input
                      type="number"
                      value={editingTransaction.amount}
                      onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: parseFloat(e.target.value) })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                      type="text"
                      value={editingTransaction.description}
                      onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <select
                      value={editingTransaction.category}
                      onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Bills">Bills</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                      Save
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${getCategoryColor(transaction.category)} flex items-center justify-center text-white font-bold`}>
                        {transaction.category[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.type === 'expense' ? 'text-black' : 'text-green-600'}`}>
                        {transaction.type === 'expense' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;