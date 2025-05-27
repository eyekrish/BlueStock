import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const IPOForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price_band_min: '',
        price_band_max: '',
        open_date: '',
        close_date: '',
        issue_size_crores: '',
        issue_type: '',
        listing_date: '',
    });

    const isDashboardActive = location.pathname === '/admin/dashboard';
    const isManageIpoActive = location.pathname === '/admin';
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        name: '',
        price_band_min: '',
        price_band_max: '',
        open_date: '',
        close_date: '',
        issue_size_crores: '',
        issue_type: '',
        listing_date: '',
        status: '',
    });
    const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/admin/login";
};

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        Object.entries(editFormData).forEach(([key, value]) => {
            if (key === 'logo' && value instanceof File) {
                form.append('logo', value);  // Append only if new file selected
            } else if (key !== 'logo') {
                form.append(key, value);
            }
        });

        try {
            await axios.put(
                `http://localhost:8000/api/companies/${editFormData.id}/`,
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('IPO updated successfully!');
            setEditModalOpen(false);
            fetchCompanies();
        } catch (error) {
            console.error('Error updating IPO:', error);
        }
    };


    const fetchCompanies = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/companies/');
            setCompanies(res.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/companies/${id}/`);
            setCompanies((prev) => prev.filter((company) => company.id !== id));
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/companies/', formData);
            alert('IPO Registered Successfully!');
            setFormData({
                name: '',
                price_band_min: '',
                price_band_max: '',
                open_date: '',
                close_date: '',
                issue_size_crores: '',
                issue_type: '',
                listing_date: '',
            });
            fetchCompanies();
        } catch (error) {
            console.error('Error saving IPO:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#f1f2f7] text-[#787f89] p-4 fixed h-full">
                {/* Logo */}
                <div className="flex items-center mb-10 space-x-3">
                    {/* Circle with 'BF' */}
                    <div className="w-10 h-10 rounded-full bg-[#6366f1] flex items-center justify-center">
                        <span className="text-white font-bold">BF</span>
                    </div>

                    {/* Company Name */}
                    <h1 className="text-xl font-bold text-[#6366f1]">Bluestock Fintech</h1>
                </div>

                {/* Menu Items */}
                <ul className="space-y-2">
                    <li>
                        <span className='flex1 w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors '>Menu</span>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors 
                                ${isDashboardActive ? 'bg-[#e4e6f4] text-blue-500' : 'hover:bg-[#e4e6f4] hover:text-blue-500'}`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="flex-1" >Dashboard</span>

                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate("/admin")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors
                                ${isManageIpoActive ? 'bg-[#e4e6f4] text-blue-500' : 'hover:bg-[#e4e6f4] hover:text-blue-500'}`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="flex-1">Manage IPO</span>

                        </button>
                    </li>
                </ul>
            </div>


            <div className="flex-1 ml-64 p-6">


                <div className="px-4 py-6 flex justify-between items-center">
                    <p className="text-2xl font-bold text-gray-800 ">Upcoming IPO | Dashboard</p></div>
                <div className="absolute top-10 right-4 flex gap-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                    <button onClick={handleLogout}
                       
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Logout
                    </button>

                </div>

                {/* Company List Table */}
                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-100 text-left text-l font-semibold text-gray-700 [&>tr]:h-20">
                            <tr>
                                <th className="p-3">Company</th>
                                <th className="p-3">Price Band</th>
                                <th className="p-3">Open</th>
                                <th className="p-3">Close</th>
                                <th className="p-3">Issue Size</th>
                                <th className="p-3">Issue Type</th>
                                <th className="p-3">Listing Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                                <th className="p-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-xl [&>tr]:h-20">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-gray-50">
                                    <td className="p-3">{company.name}</td>
                                    <td className="p-3">₹{company.price_band_min} - ₹{company.price_band_max}</td>
                                    <td className="p-3">{company.open_date}</td>
                                    <td className="p-3">{company.close_date}</td>
                                    <td className="p-3">{company.issue_size_crores} Cr.</td>
                                    <td className="p-3">{company.issue_type}</td>
                                    <td className="p-3">{company.listing_date}</td>
                                    <td className="p-3">{company.status || "N/A"}</td>



                                    <td className="p-3">
                                        <button
                                            onClick={() => {
                                                setEditFormData(company);
                                                setEditModalOpen(true);
                                            }}
                                            className="bg-violet-600 text-white text-sm px-4 py-1 rounded hover:bg-violet-700"
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(company.id)}
                                            className="flex items-center text-red-600 px-4 py-1"
                                        >

                                            <Trash2 size={30} />
                                        </button>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

                {/* Edit Modal */}
                <AnimatePresence>
                    {editModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                layout
                                initial={{ scale: 0.1, opacity: 0, y: -1000, x: 1000 }}
                                animate={{ scale: 1.1, opacity: 1, y: 0, x: 0 }}
                                exit={{ scale: 0.1, opacity: 0, y: -1000, x: 1000 }}
                                transition={{
                                    duration: 0.1,
                                    ease: "easeInOut",
                                }}
                                style={{ willChange: "transform, opacity" }}
                                className="bg-white p-6 rounded-xl shadow-xl z-50 w-full max-w-4xl"
                            >
                                <h2 className="text-xl font-semibold mb-6">Edit IPO</h2>

                                <form onSubmit={handleEditSubmit}>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Left Section */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="block font-semibold text-gray-700">Company</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editFormData.name}
                                                    onChange={handleEditChange}
                                                    placeholder="Company Name"
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Update Logo</label>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        id="logo"
                                                        type="file"
                                                        accept="image/*"
                                                        name="logo"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                setEditFormData((prevData) => ({
                                                                    ...prevData,
                                                                    logo: file,
                                                                }));
                                                            }
                                                        }}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="logo"
                                                        className="bg-violet-600 text-white font-medium py-2 px-4 rounded hover:bg-violet-700 cursor-pointer"
                                                    >
                                                        Update Logo
                                                    </label>
                                                    <span className="text-sm text-gray-600">
                                                        {editFormData.logo ? editFormData.logo.name : "No file chosen"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="block font-semibold text-gray-700">Price Band Min</label>
                                                    <input
                                                        type="number"
                                                        name="price_band_min"
                                                        value={editFormData.price_band_min}
                                                        onChange={handleEditChange}
                                                        placeholder="Min"
                                                        className="w-full border px-3 py-2 rounded"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block font-semibold text-gray-700">Price Band Max</label>
                                                    <input
                                                        type="number"
                                                        name="price_band_max"
                                                        value={editFormData.price_band_max}
                                                        onChange={handleEditChange}
                                                        placeholder="Max"
                                                        className="w-full border px-3 py-2 rounded"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700">Open Date</label>
                                                <input
                                                    type="date"
                                                    name="open_date"
                                                    value={editFormData.open_date}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700">Close Date</label>
                                                <input
                                                    type="date"
                                                    name="close_date"
                                                    value={editFormData.close_date}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>
                                        </div>

                                        {/* Right Section */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="block font-semibold text-gray-700">Issue Size (Cr.)</label>
                                                <input
                                                    type="text"
                                                    name="issue_size_crores"
                                                    value={editFormData.issue_size_crores}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700">Issue Type</label>
                                                <input
                                                    type="text"
                                                    name="issue_type"
                                                    value={editFormData.issue_type}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700">Listing Date</label>
                                                <input
                                                    type="date"
                                                    name="listing_date"
                                                    value={editFormData.listing_date}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700">Status</label>
                                                <select
                                                    name="status"
                                                    value={editFormData.status}
                                                    onChange={handleEditChange}
                                                    className="w-full border px-3 py-2 rounded"
                                                >
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Coming">Coming</option>
                                                    <option value="New Listed">New Listed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditModalOpen(false)}
                                            className="px-4 py-2 rounded bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IPOForm;
