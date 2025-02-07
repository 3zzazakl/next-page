import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Product count */}
        <StatCard
          color="purple"
          iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          value={data?.totalBooks}
          label="Products"
        />
        
        {/* Total Sales */}
        <StatCard
          color="green"
          iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          value={`$${data?.totalSales}`}
          label="Total Sales"
        />

        {/* Trending Books */}
        <StatCard
          color="red"
          iconPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          value={data?.trendingBooks}
          label="Trending Books in This Month"
          additionalInfo="(13%)"
        />

        {/* Total Orders */}
        <StatCard
          color="blue"
          icon={<MdIncompleteCircle className="size-6" />}
          value={data?.totalOrders}
          label="Total Orders"
        />
      </section>

      {/* Revenue and Other Info */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        {/* Orders per Month Chart */}
        <ChartCard 
          title="The number of orders per month" 
          content={<RevenueChart />} 
        />

        {/* Orders Left */}
        <InfoCard 
          color="yellow"
          iconPath="M12 14l9-5-9-5-9 5 9 5z"
          value="02"
          label="Orders left"
        />

        {/* Website Visits */}
        <InfoCard 
          color="teal"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          value="139"
          label="Website visits (last day)"
        />

        {/* Users by Average Order */}
        <UserList />
      </section>

      <section className="text-right font-semibold text-gray-500">
        <a href="#" className="text-purple-600 hover:underline">Recreated on Codepen</a> with 
        <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">Tailwind CSS</a> by Azri Kahar, 
        <a href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard" className="text-purple-600 hover:underline">original design</a> made by Chili Labs
      </section>
    </>
  );
};

// StatCard Component
const StatCard = ({ color, iconPath, icon, value, label, additionalInfo }) => (
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-${color}-600 bg-${color}-100 rounded-full mr-6`}>
      {icon ? icon : (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
      )}
    </div>
    <div>
      <span className="block text-2xl font-bold">{value}</span>
      {additionalInfo && <span className="inline-block text-xl text-gray-500 font-semibold">{additionalInfo}</span>}
      <span className="block text-gray-500">{label}</span>
    </div>
  </div>
);

// ChartCard Component
const ChartCard = ({ title, content }) => (
  <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
    <div className="px-6 py-5 font-semibold border-b border-gray-100">{title}</div>
    <div className="p-4 flex-grow">
      <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
        {content}
      </div>
    </div>
  </div>
);

// InfoCard Component
const InfoCard = ({ color, iconPath, value, label }) => (
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-${color}-600 bg-${color}-100 rounded-full mr-6`}>
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
    </div>
    <div>
      <span className="block text-2xl font-bold">{value}</span>
      <span className="block text-gray-500">{label}</span>
    </div>
  </div>
);

// UserList Component
const UserList = () => (
  <div className="row-span-3 bg-white shadow rounded-lg">
    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
      <span>Users by average order</span>
      <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600">
        Descending
        <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
      <ul className="p-6 space-y-6">
        {/* Replace with dynamic user data */}
        {[...Array(8)].map((_, index) => (
          <li key={index} className="flex items-center">
            <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
              <img src={`https://randomuser.me/api/portraits/men/${index + 75}.jpg`} alt={`User ${index + 1} profile`} />
            </div>
            <span className="text-gray-600">User {index + 1}</span>
            <span className="ml-auto font-semibold">{(Math.random() * (9 - 7) + 7).toFixed(1)}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Dashboard;
