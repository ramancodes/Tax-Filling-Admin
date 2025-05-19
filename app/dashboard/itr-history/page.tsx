'use client';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import axios from 'axios';
import {AppConfig} from '../../../config/config'

interface IncomeDetail {
  incomeType: string;
  incomeAmount: string;
}

interface TaxReturn {
  id: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
  assessmentYear: string;
  filingType: string;
  itrType: string;
  file: string;
  totalIncome: string;
  totalTaxAmount: string;
  dueTaxAmount: string;
  incomeDetails: IncomeDetail[];
  approved: boolean;
  feePaid: boolean;
  duePaid: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string | null;
}

interface TaxesResponse {
  message: string;
  taxes: {
    count: number;
    rows: TaxReturn[];
  };
}

const TaxReturnsDashboard: NextPage = () => {
  const [taxes, setTaxes] = useState<TaxReturn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');

  const { application: { bearerToken } } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const response = await axios.get(`${AppConfig.BACKEND_URL}/admin/all-taxes`, {
          headers: { 
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch tax data');
        }

        const {data} = response;
        
        if (data.message === "Taxes fetched successfully!" && data.taxes?.rows) {
          setTaxes(data.taxes.rows);
        } else {
          throw new Error('Failed to fetch tax data');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchTaxes();
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getITRTypeShort = (itrType: string): string => {
    if (itrType.includes('ITR-1')) return '1040';
    if (itrType.includes('ITR-2')) return '1040-SR';
    if (itrType.includes('ITR-3')) return '1040-NR';
    if (itrType.includes('ITR-5')) return '1040-EZ';
    return '1040';
  };

  // Get unique assessment years for the filter dropdown
  const uniqueYears = [...new Set(taxes.map(tax => {
    // Extract just the year part from the assessment year string
    const match = tax.assessmentYear.match(/\d{4}/);
    return match ? match[0] : 'Unknown';
  }))];

  // Filter taxes based on search term and selected year
  const filteredTaxes = taxes.filter(tax => {
    const matchesYear = selectedYear === 'All Years' || tax.assessmentYear.includes(selectedYear);
    const matchesSearch = searchTerm === '' || 
      (tax?.user?.email && tax?.user?.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesYear && matchesSearch;
  });

  if (isLoading) return <div className="flex justify-center p-8">Loading tax returns data...</div>;
  if (error) return <div className="flex justify-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tax Returns Management</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span>Filter by Year:</span>
          <select
            className="p-2 border rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All Years">All Years</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Id</th>
              <th className="text-left p-4">User Email</th>
              <th className="text-left p-4">Form Type</th>
              <th className="text-left p-4">Tax Amount</th>
              <th className="text-left p-4">Tax File Date</th>
              <th className="text-left p-4">Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredTaxes.length > 0 ? (
              filteredTaxes.map((tax) => (
                <tr key={tax.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>{tax.id || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <div>{tax?.user?.email || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {getITRTypeShort(tax.itrType)}
                    </span>
                  </td>
                  <td className="p-4">₹{parseFloat(tax.totalTaxAmount).toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })}</td>
                  <td className="p-4">{formatDate(tax.createdAt)}</td>
                  <td className="p-4">{tax.assessmentYear.split('-')[0]}</td>
                  {/* <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center">No tax returns found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredTaxes.length} of {taxes.length} tax returns
      </div>
    </div>
  );
};

export default TaxReturnsDashboard;