import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionList from './pages/TransactionList';
import BottomNavigation from './components/BottomNavigation';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/transactions" element={<TransactionList />} />
          </Routes>
        </div>
        <BottomNavigation />
      </Router>
    </TransactionProvider>
  );
}

export default App;