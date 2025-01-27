import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';

// eslint-disable-next-line react/prop-types
const StatCard = ({ icon, value, label, iconBgClass, iconTextClass }) => (
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div
      className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 ${iconBgClass} ${iconTextClass} rounded-full mr-6`}
    >
      {icon}
    </div>
    <div>
      <span className="block text-2xl font-bold">{value}</span>
      <span className="block text-gray-500">{label}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
          value={data?.totalBooks}
          label="Products"
          iconBgClass="bg-purple-100"
          iconTextClass="text-purple-600"
        />
        <StatCard
          icon={
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
          value={`$${data?.totalSales}`}
          label="Total Sales"
          iconBgClass="bg-green-100"
          iconTextClass="text-green-600"
        />
        <StatCard
          icon={
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          }
          value={data?.trendingBooks}
          label="Trending Books This Month"
          iconBgClass="bg-red-100"
          iconTextClass="text-red-600"
        />
        <StatCard
          icon={<MdIncompleteCircle className="size-6" />}
          value={data?.totalOrders}
          label="Total Orders"
          iconBgClass="bg-blue-100"
          iconTextClass="text-blue-600"
        />
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <RevenueChart />
            </div>
          </div>
        </div>
        {/* Add more cards or sections as needed */}
      </section>

      <section className="text-right font-semibold text-gray-500">
        <a href="#" className="text-purple-600 hover:underline">
          Recreated on Codepen
        </a>{' '}
        with{' '}
        <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">
          Tailwind CSS
        </a>{' '}
        by Azri Kahar,{' '}
        <a
          href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard"
          className="text-purple-600 hover:underline"
        >
          original design
        </a>{' '}
        made by Chili Labs
      </section>
    </>
  );
};

export default Dashboard;
