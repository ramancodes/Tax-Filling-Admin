'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector, RootState } from "../../../../store";
import axios from 'axios';
import { AppConfig } from '../../../../config/config';

// This component needs to be placed in app/user-details/[userId]/page.tsx for the routing to work properly

// Define TypeScript interfaces for the user data structure
interface BankDetail {
  id?: string;
  bankName: string;
  accountNumber: string;
  customerId: string;
  ifscCode: string;
}

interface Document {
  id?: string;
  documentType: string;
  fileName: string;
  file: string;
}

interface IncomeSource {
  id?: string;
  incomeType: string;
  source: string;
  amountPerAnnum: string | number;
}

interface IncomeTax {
  id?: string;
  assessmentYear: string;
  filingType: string;
  itrType: string;
  totalIncome: string | number;
  totalTaxAmount: string | number;
  dueTaxAmount: string | number;
  approved: boolean;
  file: string;
}

interface UserProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNo?: string;
  gender?: string;
  dob?: string;
  occupation?: string;
  address?: string;
  website?: string;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  userProfile?: UserProfile;
  bankDetails?: BankDetail[];
  documents?: Document[];
  incomeSources?: IncomeSource[];
  incomeTaxes?: IncomeTax[];
}

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { application: { bearerToken } } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    // Only fetch data once userId is available
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${AppConfig.BACKEND_URL}/admin/get-user/${userId}`, {
          headers: { 
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch user data');
        }
        
        // The key fix - accessing "user" instead of "users" from the response data
        const { data } = response;
        setUserData(data.user);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, bearerToken]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Loading user data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push('/dashboard/users')}
        >
          Back to Users
        </button>
      </div>
    </div>
  );

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-100">  
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">User Details</h1>
            <button 
              onClick={() => router.push('/dashboard/users')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Users
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#2a3990] border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Full Name</p>
                <p className="font-semibold">
                  {userData.userProfile?.firstName || 'N/A'} {userData.userProfile?.middleName || ''} {userData.userProfile?.lastName || ''}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-semibold">{userData.email}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Username</p>
                <p className="font-semibold">{userData.username}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold">{userData.userProfile?.phoneNo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Gender</p>
                <p className="font-semibold">{userData.userProfile?.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Date of Birth</p>
                <p className="font-semibold">
                  {userData.userProfile?.dob ? new Date(userData.userProfile.dob).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Occupation</p>
                <p className="font-semibold">{userData.userProfile?.occupation || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Address</p>
                <p className="font-semibold">{userData.userProfile?.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Website</p>
                <p className="font-semibold">{userData.userProfile?.website || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Registration Date</p>
                <p className="font-semibold">{new Date(userData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {userData.bankDetails && userData.bankDetails.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#2a3990] border-b pb-2">Bank Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.bankDetails.map((bank, index) => (
                      <tr key={bank.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bank.bankName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.accountNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.customerId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bank.ifscCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userData.documents && userData.documents.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#2a3990] border-b pb-2">Documents</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.documents.map((doc, index) => (
                      <tr key={doc.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.documentType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.fileName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            View Document
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userData.incomeSources && userData.incomeSources.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#2a3990] border-b pb-2">Income Sources</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income Type</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Per Annum</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.incomeSources.map((income, index) => (
                      <tr key={income.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{income.incomeType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.source}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{parseFloat(income.amountPerAnnum as string).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userData.incomeTaxes && userData.incomeTaxes.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-[#2a3990] border-b pb-2">Income Tax Returns</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Year</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Type</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITR Type</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Income</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tax</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Tax</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.incomeTaxes.map((tax, index) => (
                      <tr key={tax.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tax.assessmentYear}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tax.filingType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tax.itrType.split(' ')[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{parseFloat(tax.totalIncome as string).toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{parseFloat(tax.totalTaxAmount as string).toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{parseFloat(tax.dueTaxAmount as string).toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tax.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {tax.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href={tax.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mr-3">
                            View File
                          </a>
                          {/* {!tax.approved && (
                            <button className="text-green-600 hover:text-green-800">
                              Approve
                            </button>
                          )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}