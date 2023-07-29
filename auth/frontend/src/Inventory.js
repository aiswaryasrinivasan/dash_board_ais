import { Link, Outlet,useNavigate} from 'react-router-dom'
import { Space, Typography, Card } from 'antd';
import React, { useEffect, useRef,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Chart from 'chart.js/auto';

import axios from 'axios';
function Inventory() {
  const navigate = useNavigate();
  
  // Replace this with your actual logout logic if needed
  const handleLogout = () => {
    // For example, if you are using localStorage:
    localStorage.clear();
    // After logout, navigate to the signup page
    navigate('/signup');
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">N Dashboard</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li>
                <Link to="/dashboard" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Warehouse</span>
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Inventory</span>
                </Link>
              </li>
              <li>
                <Link to="/node" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Node</span>
                </Link>
              </li>
              <li>
                <Link to="/slot" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Slot</span>
                </Link>
              </li>
              <li>
                <Link to="/report" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Report</span>
                </Link>
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
   
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='p-2 d-flex justify-content-center'>
        <CardComponent1 title="Overall Inventory Rating">
          <ChartComponent1 />
        </CardComponent1>
        </div>
        <div className='p-2 d-flex justify-content-center'>
        <CardComponent2 title="Inventory Carrying Cost">
          <StackedBarChart />
        </CardComponent2>
        </div>
        <div className='justify-content-center'>
        <WeatherApp />
        </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='p-2 d-flex  justify-content-center'>
        <CardComponent4 title="Slots">
          <LineChart/>
        </CardComponent4>
        </div>
        <div className='p-2 d-flex  justify-content-center'>
      <CardComponent3 title="Table">
        <Table />
      </CardComponent3>
      </div>
    </div>
    </div>
  </div>
</div>
</div>

    )
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
    <Card title={title} style={{ width: '485px', marginBottom: '10px',borderRadius: '5px',border: '1px solid #ccc' }}>
      {children}
    </Card>
  );
}
function CardComponent3({ title, children }) {
  return (
    <Card title={title} style={{ width: '450px', marginBottom: '10px',borderRadius: '5px',border: '1px solid #ccc' }}>
      {children}
    </Card>
  );
}
function CardComponent4({ title, children }) {
  return (
    <Card title={title} style={{ width: '550px', marginBottom: '10px',borderRadius: '5px' ,border: '1px solid #ccc'}}>
      {children}
    </Card>
  );
}
function ChartComponent1() {
  const chartRef = useRef(null);

  useEffect(() => {
    // setup
    const data = {
    
      datasets: [
        {
          label: 'Inventory Rating',
          data: [30,30 ,30 ],
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
          0.6
        </div>
      </div>
    </div>
  </div>
  );
}

const data = [
  { name: 'Warehouse1', value1: 10, value2: 20, value3: 30, value4: 20, value5: 30  },
  { name: 'Warehouse2', value1: 15, value2: 25, value3: 35 , value4: 20, value5: 30 },
  { name: 'Warehouse3', value1: 20, value2: 30, value3: 40 , value4: 20, value5: 30 },
  { name: 'Warehouse4', value1: 25, value2: 35, value3: 45 , value4: 20, value5: 30 },
  { name: 'Warehouse5', value1: 25, value2: 35, value3: 45 , value4: 20, value5: 30 },
];

function StackedBarChart() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <BarChart width={350} height={300} data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value1" stackId="stack" fill="#132743" barSize={35} />
        <Bar dataKey="value2" stackId="stack" fill="#407088" barSize={35} />
        <Bar dataKey="value3" stackId="stack" fill="#5585b5" barSize={35} />
        <Bar dataKey="value3" stackId="stack" fill="#53a8b6" barSize={35} />
        <Bar dataKey="value3" stackId="stack" fill="#79c2d0" barSize={35} />
      </BarChart>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#132743', marginRight: '5px' }}></div>
          <span>Storage Cost</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#407088', marginRight: '5px' }}></div>
          <span>Handling Cost</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#5585b5', marginRight: '5px' }}></div>
          <span>AdministrativeCost</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#53a8b6', marginRight: '5px' }}></div>
          <span>Damage</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#79c2d0', marginRight: '5px' }}></div>
          <span>Loss</span>
        </div>
      </div>
    </div>
  );
}

function LineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Your LineChart code
    // Make sure this code is correct and does not throw any errors.
    const dataLine = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Fresh Units',
            data: [350, 800, 853, 277, 585, 425],
            backgroundColor: ['rgba(255, 26, 104, 0.2)'],
            borderColor: ['rgba(255, 26, 104, 1)'],
            tension: 0.4,
          },
          {
            label: 'Decayed Units',
            data: [150,50,47,23,15,25],
            backgroundColor: ['rgba(0, 0, 0, 0.2)'],
            borderColor: ['rgba(0, 0, 0, 1)'],
            tension: 0.4,
            yAxisID: 'percentage',
          },
        ],
      };
  
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days of the week',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
            
            },
          },
          percentage: {
            beginAtZero: true,
            position: 'right',
            title: {
              display: true,
          
            },
          },
        },
      };
  
      const config = {
        type: 'line',
        data: dataLine,
        options: options,
      };
  
      const chartInstance = new Chart(chartRef.current, config);
  
      return () => {
        chartInstance.destroy();
      };
  }, []);

  return <canvas ref={chartRef}></canvas>;
}

function Table() {
    const tableStyle = {
      borderCollapse: 'collapse',
      width: '100%',
    };
  
    const thStyle = {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
    };
  
    const tdStyle = {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      fontSize:18
    };
  
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>variety</th>
            <th style={thStyle}>unitsinhand</th>
            <th style={thStyle}>freshunits</th>
            <th style={thStyle}>decayedunits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>variety1</td>
            <td style={tdStyle}>500</td>
            <td style={tdStyle}>350</td>
            <td style={tdStyle}>150</td>
          </tr>
          <tr>
            <td style={tdStyle}>variety2</td>
            <td style={tdStyle}>850</td>
            <td style={tdStyle}>800</td>
            <td style={tdStyle}>50</td>
          </tr>
          <tr>
            <td style={tdStyle}>variety3</td>
            <td style={tdStyle}>900</td>
            <td style={tdStyle}>853</td>
            <td style={tdStyle}>47</td>
          </tr>
          <tr>
            <td style={tdStyle}>variety4</td>
            <td style={tdStyle}>300</td>
            <td style={tdStyle}>277</td>
            <td style={tdStyle}>23</td>
          </tr>
          <tr>
            <td style={tdStyle}>variety5</td>
            <td style={tdStyle}>600</td>
            <td style={tdStyle}>585</td>
            <td style={tdStyle}>15</td>
          </tr>
          <tr>
            <td style={tdStyle}>variety6</td>
            <td style={tdStyle}>450</td>
            <td style={tdStyle}>425</td>
            <td style={tdStyle}>25</td>
          </tr>
        </tbody>
      </table>
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

  export default Inventory;