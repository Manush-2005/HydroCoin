// src/pages/ProducerDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const initialRequests = Array.from({ length: 25 }, (_, index) => ({
  id: uuidv4(),
  batchNo: `BATCH_${index + 1}`,
  buyerName: `Buyer_${(index % 5) + 1}`,
  date: new Date(Date.now() - index * 10000000).toLocaleDateString(),
  status: ["Pending", "Approved", "Coin_Provided", "Cancelled"][index % 4],
}));

export const Table = () => {
  const [tableData, setTableData] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(initialRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: "" });
  const [activeFilter, setActiveFilter] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    applyFilters(searchTerm, filters);
  }, []);

  const getUniqueValues = (field) => [...new Set(tableData.map(item => item[field]))];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filters);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
    setActiveFilter(null);
  };

  const applyFilters = (searchTerm, currentFilters) => {
    let filtered = tableData.filter(item => {
      const matchesSearch = Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesFilters = Object.entries(currentFilters).every(([key, value]) => {
        if (!value) return true;
        return item[key].toString().toLowerCase() === value.toLowerCase();
      });
      return matchesSearch && matchesFilters;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ status: "" });
    setSearchTerm("");
    setFilteredData(tableData);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const FilterDropdown = ({ field, label }) => (
    <div className="relative">
      <button
        onClick={() => setActiveFilter(activeFilter === field ? null : field)}
        className="flex items-center space-x-1 text-xs font-medium text-gray-200 uppercase tracking-wider"
      >
        <span>{label}</span>
        <ChevronDown size={14} />
      </button>
      {activeFilter === field && (
        <div className="absolute z-10 mt-2 w-48 bg-green-800 border border-gray-700 rounded-lg shadow-lg">
          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
              onClick={() => handleFilterChange(field, '')}
            >
              Clear Filter
            </button>
            {getUniqueValues(field).map((value, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                onClick={() => handleFilterChange(field, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      className="hidden md:block bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#0a0f0d] mb-8 w-[20rem] md:w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-100">Producer Requests</h2>
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          >
            Clear All Filters
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search requests..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Batch No</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Buyer Name</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</span>
              </th>
              <th className="px-6 py-3 text-left">
                <FilterDropdown field="status" label="Status" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentData.map((request) => {
              // determine text color based on status
              let statusColor = "text-gray-300"; // default
              switch (request.status.toLowerCase()) {
                case "pending":
                  statusColor = "text-yellow-400";
                  break;
                case "approved":
                  statusColor = "text-blue-400";
                  break;
                case "coin_provided":
                  statusColor = "text-green-400";
                  break;
                case "cancelled":
                  statusColor = "text-red-500";
                  break;
                default:
                  statusColor = "text-gray-300";
              }

              return (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {request.batchNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {request.buyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {request.date}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${statusColor}`}>
                    {request.status}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>

        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-gray-300">
          <div className="text-sm">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Table;
