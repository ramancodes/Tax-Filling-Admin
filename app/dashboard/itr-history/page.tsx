"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Tax Return interface
interface TaxReturn {
  id: string;
  userName: string;
  userId: string;
  formType: string;
  taxAmount: number;
  taxFileDate: string; // ISO date string
  year: number;
}

interface AddEditTaxReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taxReturn: Omit<TaxReturn, 'id'>) => void;
  taxReturn?: TaxReturn;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  year: number;
}

// Mock API functions - replace these with your actual API calls
const fetchTaxReturns = async (): Promise<TaxReturn[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Sample data - in a real app, this would come from your backend
  return [
    {
      id: '1',
      userName: 'John Doe',
      userId: 'user-001',
      formType: '1040',
      taxAmount: 5250.75,
      taxFileDate: '2024-04-10T09:15:00Z',
      year: 2023
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userId: 'user-002',
      formType: '1040-SR',
      taxAmount: 3120.50,
      taxFileDate: '2024-03-22T14:30:00Z',
      year: 2023
    },
    {
      id: '3',
      userName: 'Robert Johnson',
      userId: 'user-003',
      formType: '1040-NR',
      taxAmount: 7845.25,
      taxFileDate: '2023-04-15T10:45:00Z',
      year: 2022
    },
    {
      id: '4',
      userName: 'Emily Davis',
      userId: 'user-004',
      formType: '1040',
      taxAmount: 4325.00,
      taxFileDate: '2023-03-30T16:20:00Z',
      year: 2022
    },
    {
      id: '5',
      userName: 'Michael Wilson',
      userId: 'user-005',
      formType: '1040-EZ',
      taxAmount: 1850.25,
      taxFileDate: '2022-04-12T11:40:00Z',
      year: 2021
    },
    {
      id: '6',
      userName: 'John Doe',
      userId: 'user-001',
      formType: '1040',
      taxAmount: 4950.50,
      taxFileDate: '2023-04-05T13:25:00Z',
      year: 2022
    },
    {
      id: '7',
      userName: 'Jane Smith',
      userId: 'user-002',
      formType: '1040-SR',
      taxAmount: 2980.75,
      taxFileDate: '2022-04-01T15:10:00Z',
      year: 2021
    }
  ];
};

const addTaxReturn = async (taxReturn: Omit<TaxReturn, 'id'>): Promise<TaxReturn> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be handled by your backend
  return {
    ...taxReturn,
    id: Math.random().toString(36).substring(2, 9) // Generate a random ID
  };
};

const updateTaxReturn = async (taxReturn: TaxReturn): Promise<TaxReturn> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be handled by your backend
  return taxReturn;
};

const deleteTaxReturn = async (id: string): Promise<void> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be handled by your backend
  return;
};

// Modal components
const AddEditTaxReturnModal: React.FC<AddEditTaxReturnModalProps> = ({ isOpen, onClose, onSave, taxReturn }) => {
  const [formData, setFormData] = useState<Omit<TaxReturn, 'id'>>({
    userName: '',
    userId: '',
    formType: '',
    taxAmount: 0,
    taxFileDate: new Date().toISOString(),
    year: new Date().getFullYear() - 1 // Default to previous year
  });

  useEffect(() => {
    if (taxReturn) {
      setFormData({
        userName: taxReturn.userName,
        userId: taxReturn.userId,
        formType: taxReturn.formType,
        taxAmount: taxReturn.taxAmount,
        taxFileDate: taxReturn.taxFileDate,
        year: taxReturn.year
      });
    } else {
      setFormData({
        userName: '',
        userId: '',
        formType: '',
        taxAmount: 0,
        taxFileDate: new Date().toISOString(),
        year: new Date().getFullYear() - 1 // Default to previous year
      });
    }
  }, [taxReturn, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'taxAmount') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else if (name === 'year') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  // Generate year options (last 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{taxReturn ? 'Edit Tax Return' : 'Add New Tax Return'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formType">
              Form Type
            </label>
            <select
              id="formType"
              name="formType"
              value={formData.formType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Form Type</option>
              <option value="1040">1040</option>
              <option value="1040-SR">1040-SR</option>
              <option value="1040-NR">1040-NR</option>
              <option value="1040-EZ">1040-EZ</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxAmount">
              Tax Amount ($)
            </label>
            <input
              type="number"
              id="taxAmount"
              name="taxAmount"
              value={formData.taxAmount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxFileDate">
              Tax File Date
            </label>
            <input
              type="date"
              id="taxFileDate"
              name="taxFileDate"
              value={formData.taxFileDate.split('T')[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, taxFileDate: `${e.target.value}T00:00:00Z` }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Tax Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, userName, year }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the tax return for <span className="font-semibold">{userName}</span> for year <span className="font-semibold">{year}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TaxReturnsManagement() {
  const [taxReturns, setTaxReturns] = useState<TaxReturn[]>([]);
  const [filteredTaxReturns, setFilteredTaxReturns] = useState<TaxReturn[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentTaxReturn, setCurrentTaxReturn] = useState<TaxReturn | undefined>(undefined);
  const [taxReturnToDelete, setTaxReturnToDelete] = useState<TaxReturn | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  // Get available years from tax returns for filter dropdown
  const availableYears = Array.from(
    new Set(taxReturns.map(taxReturn => taxReturn.year))
  ).sort((a, b) => b - a); // Sort years in descending order

  useEffect(() => {
    const loadTaxReturns = async () => {
      try {
        setLoading(true);
        const taxReturnData = await fetchTaxReturns();
        setTaxReturns(taxReturnData);
        setFilteredTaxReturns(taxReturnData);
      } catch (err) {
        setError('Failed to load tax returns. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTaxReturns();
  }, []);

  // Apply search and filters whenever taxReturns, searchTerm, or yearFilter changes
  useEffect(() => {
    let result = [...taxReturns];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(taxReturn => 
        taxReturn.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply year filter
    if (yearFilter !== 'all') {
      result = result.filter(taxReturn => taxReturn.year === yearFilter);
    }
    
    setFilteredTaxReturns(result);
  }, [taxReturns, searchTerm, yearFilter]);

  const handleAddTaxReturn = () => {
    setCurrentTaxReturn(undefined);
    setIsAddEditModalOpen(true);
  };

  const handleEditTaxReturn = (taxReturn: TaxReturn) => {
    setCurrentTaxReturn(taxReturn);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClick = (taxReturn: TaxReturn) => {
    setTaxReturnToDelete(taxReturn);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTaxReturn = async (taxReturnData: Omit<TaxReturn, 'id'>) => {
    try {
      setLoading(true);
      
      if (currentTaxReturn) {
        // Update existing tax return
        const updatedTaxReturn = await updateTaxReturn({ ...taxReturnData, id: currentTaxReturn.id });
        setTaxReturns(prev => prev.map(taxReturn => taxReturn.id === currentTaxReturn.id ? updatedTaxReturn : taxReturn));
      } else {
        // Add new tax return
        const newTaxReturn = await addTaxReturn(taxReturnData);
        setTaxReturns(prev => [...prev, newTaxReturn]);
      }
      
      setIsAddEditModalOpen(false);
    } catch (err) {
      setError('Failed to save tax return. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTaxReturn = async () => {
    if (!taxReturnToDelete) return;
    
    try {
      setLoading(true);
      await deleteTaxReturn(taxReturnToDelete.id);
      setTaxReturns(prev => prev.filter(taxReturn => taxReturn.id !== taxReturnToDelete.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError('Failed to delete tax return. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleYearFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setYearFilter(value === 'all' ? 'all' : parseInt(value, 10));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PP');
    } catch (err) {
      return 'Invalid date';
    }
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (loading && taxReturns.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading tax returns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tax Returns Management</h1>
          <button
            onClick={handleAddTaxReturn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Tax Return
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by username..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="yearFilter" className="mr-2 text-gray-700 font-medium">Filter by Year:</label>
              <select
                id="yearFilter"
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={yearFilter === 'all' ? 'all' : yearFilter}
                onChange={handleYearFilterChange}
              >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax File Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTaxReturns.map((taxReturn) => (
                  <tr key={taxReturn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{taxReturn.userName}</div>
                      <div className="text-xs text-gray-500">ID: {taxReturn.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {taxReturn.formType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{formatCurrency(taxReturn.taxAmount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(taxReturn.taxFileDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{taxReturn.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditTaxReturn(taxReturn)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(taxReturn)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTaxReturns.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      {taxReturns.length === 0 ? 
                        "No tax returns found. Click \"Add New Tax Return\" to create one." : 
                        "No tax returns match your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Result count */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredTaxReturns.length}</span> of <span className="font-medium">{taxReturns.length}</span> tax returns
            </p>
          </div>
        </div>

        {loading && taxReturns.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Tax Return Modal */}
      <AddEditTaxReturnModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveTaxReturn}
        taxReturn={currentTaxReturn}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTaxReturn}
        userName={taxReturnToDelete?.userName || ''}
        year={taxReturnToDelete?.year || 0}
      />
    </div>
  );
}