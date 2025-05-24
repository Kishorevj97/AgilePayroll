// App.js
import React, { useState } from 'react';
import './App.css'; // 👈 Add this line
import app from './firebase';
// Then import specific Firebase services, e.g. Firestore, Auth, etc., using `app`


const employees = [
  { id: 1, name: "Developer A", role: "Developer", salary: 6000 },
  { id: 2, name: "UI/UX Designer", role: "Designer", salary: 5500 },
  { id: 3, name: "Human Resource", role: "HR", salary: 5000 },
  { id: 4, name: "John", role: "Senior HR", salary: 5000 }
];

function calculateTax(salary) {
  // Simple tax: 10% for demo
  return salary * 0.10;
}

function EmployeeList({ onSelect }) {
  return (
    <div className="card">
      <h2>Employee List</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <button onClick={() => onSelect(emp)}>
              {emp.name} — {emp.role}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
function PayrollCalculation({ employee, onBack }) {
  const [salary, setSalary] = useState(employee.salary);
  const tax = calculateTax(salary);
  const netPay = salary - tax;

  return (
    <div className="card">
      <button onClick={onBack}>Back to List</button>
      <h2>Payroll for {employee.name}</h2>
      <div className="label-input-group">
        <label>Gross Salary (£):</label>
        <input
          type="number"
          value={salary}
          onChange={e => setSalary(Number(e.target.value))}
        />
      </div>
      <div className="details">
        <p>Tax Deducted (10%): <strong>£{tax.toFixed(2)}</strong></p>
        <p>Net Pay: <strong>£{netPay.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}


function PayslipViewer({ employee, onBack }) {
  const date = new Date().toLocaleDateString('en-GB');

  return (
    <div className="card">
      <button onClick={onBack}>Back to List</button>
      <h2>Payslip for {employee.name}</h2>
      <div className="details">
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Gross Salary:</strong> £{employee.salary.toFixed(2)}</p>
        <p><strong>Tax (10%):</strong> £{(employee.salary * 0.10).toFixed(2)}</p>
        <p><strong>Net Pay:</strong> £{(employee.salary * 0.90).toFixed(2)}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
    </div>
  );
}


function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState('list');

  return (
    <div className="container">
      <h1>UK Payroll System</h1>
      {view === 'list' && (
        <EmployeeList onSelect={(emp) => {
          setSelectedEmployee(emp);
          setView('payroll');
        }} />
      )}
      {view === 'payroll' && selectedEmployee && (
        <>
          <PayrollCalculation
            employee={selectedEmployee}
            onBack={() => setView('list')}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setView('payslip')}>View Payslip</button>
          </div>
        </>
      )}
      {view === 'payslip' && selectedEmployee && (
        <PayslipViewer
          employee={selectedEmployee}
          onBack={() => setView('list')}
        />
      )}
    </div>
  );
}

export default App;
