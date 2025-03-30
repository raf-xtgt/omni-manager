"use client";

import { useState } from 'react';
import AddCustomer from './addCustomer';

interface Customer {
    name: string;
    company: string;
    phone: string;
    email: string;
    country: string;
    status: 'Active' | 'Inactive';
  }

export default function CustomerListing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([
        {
          name: "Jane Cooper",
          company: "Microsoft",
          phone: "(225) 555-018",
          email: "jane@microsoft.com",
          country: "United States",
          status: "Active"
        },
        {
          name: "Floyd Miles",
          company: "Yahoo",
          phone: "(205) 555-0100",
          email: "floyd@yahoo.com",
          country: "Kiribati",
          status: "Inactive"
        },
        {
          name: "Marvin McKinney",
          company: "Tesla",
          phone: "(252) 555-0126",
          email: "marvin@tesla.com",
          country: "Iran",
          status: "Active"
        },
        {
          name: "Jerome Bell",
          company: "Google",
          phone: "(623) 555-0129",
          email: "jerome@google.com",
          country: "Reunion",
          status: "Active"
        },
        {
          name: "Kathryn Murphy",
          company: "Microsoft",
          phone: "(406) 555-0120",
          email: "kathryn@microsoft.com",
          country: "Curaçao",
          status: "Active"
        },
        {
          name: "Jacob Jones",
          company: "Yahoo",
          phone: "(208) 555-0112",
          email: "jacob@yahoo.com",
          country: "Brazil",
          status: "Active"
        },
        {
          name: "Kristin Watson",
          company: "Facebook",
          phone: "(704) 555-0127",
          email: "kristin@facebook.com",
          country: "Åland Islands",
          status: "Inactive"
        }
      ]);

      const handleAddCustomer = (newCustomer:any) => {
        // In a real app, you would add the customer to your state/API here
        console.log('New customer data:', JSON.stringify(newCustomer, null, 2));
        // For demo purposes, we'll just log to console
        // setCustomers([...customers, { ...newCustomer, status: "Active" }]);
      };
  
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Customers</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              aria-label="Add customer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <h3 className="font-semibold mb-4">Active Members</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Showing data 1 to 8 of 256K entries
          </div>
    
          <AddCustomer
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddCustomer}
          />
        </div>
      );
  }