import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet,useNavigate} from 'react-router-dom'
import  { useState } from 'react';
import {Typography,Space} from 'antd';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Report() {
  const navigate = useNavigate();
  
  // Replace this with your actual logout logic if needed
  const handleLogout = () => {
    // For example, if you are using localStorage:
    localStorage.clear();
    // After logout, navigate to the signup page
    navigate('/signup');
  };
return (
<div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">N Dashboard</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                 
                    <li>
                        <Link to="/dashboard"  data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Warehouse</span> </Link>
                       
                    </li>
                    <li>
                        <Link to="/inventory" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Inventory</span></Link>
                    </li>
                    <li>
                        <Link to="/node" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Node</span></Link>
                        
                    </li>
                    <li>
                        <Link to="/slot" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Slot</span> </Link>
                           
                    </li>
                    <li>
                        <Link to="/report" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Report</span> </Link>
                    </li>
                    <li>
                  <button onClick={handleLogout} class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Log Out</span>
                  </button>
                </li>
                </ul>
          </div>
        </div>
        <div class= "col p-0 m-0">
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>N Warehouse</h4>
        </div>
        <div>
   
        <div className='p-2 d-flex justify-content-center'>
   <ReportGenerator />
  </div>
 </div >
    </div>
  </div>
</div>

    )
}
function ReportGenerator() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showGraphs, setShowGraphs] = useState(false);
  
    const handleFromDateChange = (event) => {
      setFromDate(event.target.value);
    };
  
    const handleToDateChange = (event) => {
      setToDate(event.target.value);
    };
  
    const handleGenerateReport = () => {
      // Generate report logic based on selected date range
      setShowGraphs(true);
      console.log('Generating report...');
    };
  
    const handlePrintReport = () => {
      window.print();
    };
  
    const barData = [
      { name: 'Category 1', value: 100 },
      { name: 'Category 2', value: 200 },
      { name: 'Category 3', value: 150 },
      { name: 'Category 4', value: 300 },
      { name: 'Category 5', value: 250 },
    ];
  
    const lineData = [
      { name: 'Day 1', value: 10 },
      { name: 'Day 2', value: 20 },
      { name: 'Day 3', value: 15 },
      { name: 'Day 4', value: 30 },
      { name: 'Day 5', value: 25 },
    ];
  
    const areaData = [
      { name: 'Month 1', value: 100 },
      { name: 'Month 2', value: 200 },
      { name: 'Month 3', value: 150 },
      { name: 'Month 4', value: 300 },
      { name: 'Month 5', value: 250 },
    ];
  
    return (
      <div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>From Date:</label>
        <input type="date" value={fromDate} onChange={handleFromDateChange} style={{ marginRight: '20px' }} />
        <label style={{ marginRight: '10px' }}>To Date:</label>
        <input type="date" value={toDate} onChange={handleToDateChange} />
      </div>
      <button
        onClick={handleGenerateReport}
        style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Generate Report
      </button>
      <button
        onClick={handlePrintReport}
        style={{ padding: '8px 16px', backgroundColor: '#17A2B8', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Print Report
      </button>
  
        {showGraphs && (
          <div>
            <div>
              <h3>Bar Graph</h3>
              <BarChart width={400} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
  
            <div>
              <h3>Line Graph</h3>
              <LineChart width={400} height={300} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </div>
  
            <div>
              <h3>Area Graph</h3>
              <AreaChart width={400} height={300} data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
              </AreaChart>
            </div>
          </div>
        )}
      </div>
    );
  }
export default Report