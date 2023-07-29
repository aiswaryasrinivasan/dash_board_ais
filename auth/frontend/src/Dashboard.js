import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet,useNavigate} from 'react-router-dom'
import { Space, Typography, Card } from "antd";
import  { useEffect, useRef,useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Dashboard() {
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
                        <i class="fs-4 bi-hdd-stack"></i> <span class="ms-1 d-none d-sm-inline">Node</span></Link>
                        
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
                  <i class="fs-4 bi-power"></i><span class="ms-1 d-none d-sm-inline">Log Out</span>
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
   
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='p-2 d-flex justify-content-center'>
        <CardComponent1 title="Overall-Rating">
          <ChartComponent1 />
        </CardComponent1>
        </div>
        <div className='p-2 d-flex justify-content-center'>
        <CardComponent2 title="Our-Warehouse">
          <ChartComponent2 />
        </CardComponent2>
        </div>
        <div className='justify-content-center'>
        <WeatherApp />
        </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='p-2 d-flex  justify-content-center'>
        <CardComponent4 title="Slots">
          <NodeComponent1/>
        </CardComponent4>
        </div>
        <div className='p-2 d-flex  justify-content-center'>
      <CardComponent3 title="Recent Activities">
        <ActivitiesList />
      </CardComponent3>
      </div>
    </div>
    </div>
  </div>
</div>
</div>

    )
}
function ChartComponent1() {
    const chartRef = useRef(null);
  
    useEffect(() => {
      // setup
      const data = {
      
        datasets: [
          {
            label: 'Rating',
            data: [25, 25, 25],
            backgroundColor: [
              'rgba(255, 26, 104, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(0, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 26, 104, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 0, 0, 1)',
            ],
            borderWidth: 1,
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            borderRadius: 10,
            needleValue: 49.5,
          },
        ],
      };
  
      const gaugeNeedle = {
        id: 'gaugeNeedle',
        afterDatasetsDraw(chart, args, plugins) {
          const { ctx, data } = chart;
  
          ctx.save();
          const needleValue = data.datasets[0].needleValue;
  
          console.log(chart.getDatasetMeta(0).data[0]);
          const xCenter = chart.getDatasetMeta(0).data[0].x;
          const yCenter = chart.getDatasetMeta(0).data[0].y;
          const outerRadius =
            chart.getDatasetMeta(0).data[0].outerRadius - 6;
  
          const angle = Math.PI;
          const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
          let circumference =
            (chart.getDatasetMeta(0).data[0].circumference /
              Math.PI /
              data.datasets[0].data[0]) *
            needleValue;
          const needleValueAngle = circumference + 1.5;
          console.log(circumference);
  
          console.log(
            chart.getDatasetMeta(0).data[0].circumference
          );
  
          ctx.translate(xCenter, yCenter);
          ctx.rotate(angle * needleValueAngle);
  
          ctx.beginPath();
          ctx.strokeStyle = 'darkgrey';
          ctx.fillStyle = 'darkgrey';
          ctx.moveTo(0 - 5, 0);
          ctx.lineTo(0, -outerRadius);
          ctx.lineTo(0 + 5, 0);
          ctx.stroke();
          ctx.fill();
  
          ctx.beginPath();
          ctx.arc(0, 0, 10, angle * 0, angle * 2, false);
          ctx.fill();
          ctx.restore();
        },
      };
  
      // config
      const config = {
        type: 'doughnut',
        data,
        options: {
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        plugins: [gaugeNeedle],
      };
  
      // render chart
      const chartInstance = new Chart(chartRef.current, config);
  
      return () => {
        chartInstance.destroy();
      };
    }, []);
  
    return (
      <div>
      <div className="chartMenu"></div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas ref={chartRef} id="myChart"></canvas>
          <div
            style={{
              position: 'absolute',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            0.8
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  const data02 = [
    {
      name: 'Chennai',
      value: 5,
    },
    {
      name: 'Thanjavur',
      value: 7,
    },
    {
      name: 'Trichy',
      value: 9,
    },
    {
      name: 'Madurai',
      value: 11,
    },
    {
      name: 'Coimbatore',
      value: 14,
    },
    {
      name: 'Tripur',
      value: 16,
    },
    {
      name: 'Ooty',
      value: 18,
    },
    {
      name: 'Vellore',
      value: 20,
    },
  ];
  
  function ChartComponent2() {
    const COLORS = ['#93e4c1', '#3baea0', '#118a7e', '#1f6f78', '#bbe4e9', '#53a8b6','#79c2d0','#4c9173'];
  
    const formatData = (data) => {
      return data.map((entry) => ({ ...entry, value: (entry.value / 100) * 100 }));
    };
  
    const formattedData = formatData(data02);
  
    return (
      <div style={{ width: '350px', height: '250px' }}>
        <PieChart width={350} height={250}>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </div>
    );
  }
  
  function CardComponent1({ title, children }) {
    return (
      <Card title={title} style={{ width: '320px', marginBottom: '10px',borderRadius: '5px',border: '1px solid #ccc' }}>
        {children}
      </Card>
    );
  }
  function CardComponent2({ title, children }) {
    return (
      <Card title={title} style={{ width: '370px', marginBottom: '10px',borderRadius: '5px',border: '1px solid #ccc' }}>
        {children}
      </Card>
    );
  }
  function CardComponent3({ title, children }) {
    return (
      <Card title={title} style={{ width: '340px', marginBottom: '10px',borderRadius: '5px',border: '1px solid #ccc' }}>
        {children}
      </Card>
    );
  }
  function CardComponent4({ title, children }) {
    return (
      <Card title={title} style={{ width: '700px', marginBottom: '10px',borderRadius: '5px' ,border: '1px solid #ccc'}}>
        {children}
      </Card>
    );
  }
  
  function ActivitiesList() {
    return (
      <div>
        <div style={{ flex: '0 0 11.11%', padding: '0 5px', marginBottom: '20px', width: 'calc(33.33%- 10px)' }}>
          <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #eaf0ff, #d7f3e3)' }}>
            <h3 style={{ fontSize: '20px' }}>NWG1001 is Active</h3>
          </div>
        </div>
  
        <div style={{ flex: '0 0 11.11%', padding: '0 5px', marginBottom: '20px', width: 'calc(33.33%- 10px)' }}>
          <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #fde9d9, #d7f3e3)' }}>
            <h3 style={{ fontSize: '20px' }}>NWG1002 is InActive</h3>
          </div>
        </div>
  
        <div style={{ flex: '0 0 11.11%', padding: '0 5px', marginBottom: '20px', width: 'calc(33.33%- 10px)' }}>
          <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #d7f3e3, #eaf0ff)' }}>
            <h3 style={{ fontSize: '20px' }}>NWG1004 is Active</h3>
          </div>
        </div>
        <div style={{ flex: '0 0 11.11%', padding: '0 5px', marginBottom: '20px', width: 'calc(33.33%- 10px)' }}>
          <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #d7f3e3, #eaf0ff)' }}>
            <h3 style={{ fontSize: '20px' }}>NWG1005 is Active</h3>
          </div>
        </div>
      </div>
    );
  }
  
  function NodeComponent1(){
    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #eaf0ff, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1001</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #fde9d9, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }} >NW1002</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #d7f3e3, #eaf0ff)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1003</h3>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #eaf0ff, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1004</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #fde9d9, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1005</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #d7f3e3, #eaf0ff)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1006</h3>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #eaf0ff, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1007</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #fde9d9, #d7f3e3)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1008</h3>
            </div>
          </div>
  
          <div style={{ flex: '0 0 30%', padding: '0 20px', marginBottom: '20px', width: 'calc(33.33% - 10px)' }}>
            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', background: 'linear-gradient(to right, #d7f3e3, #eaf0ff)' }}>
              <h3 style={{ fontSize: '20px' }}>NW1009</h3>
            </div>
          </div>
        </div>
      </div>
    );
    }
    function WeatherApp() {
      const [weatherData, setWeatherData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const API_KEY = '13d741cf4f95f58cc8763ccfc1b6059e';
      const CITY_NAME = 'Thanjavur';
    
      useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=imperial`
            );
            const data = response.data;
            setWeatherData(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
    
        fetchWeatherData();
      }, [API_KEY, CITY_NAME]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      const weatherBoxStyle = {
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        padding: '25px',
        background: 'linear-gradient(to bottom, #e66465, #9198e5)',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
      };
    
      return (
        <div className="weather-container">
          <h1 style={{ color: 'white', textAlign: 'center' }}></h1>
          {weatherData && (
            <div style={weatherBoxStyle} className="weather-box">
              <h2>{CITY_NAME}</h2>
              <h3>{weatherData.weather[0].main}</h3>
              <p>Temperature: {weatherData.main.temp}°F</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Weather Description: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      );
    }
    
  
export default Dashboard
