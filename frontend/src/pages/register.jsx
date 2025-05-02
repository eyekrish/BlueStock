import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    price_band_min: "",
    price_band_max: "",
    open_date: "",
    close_date: "",
    issue_size_crores: "",
    issue_type: "",
    listing_date: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoDelete = () => {
    setFormData(prev => ({ ...prev, logo: null }));
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      await axios.post("http://localhost:8000/api/companies/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Company registered successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">IPO Details</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Price Band */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Price Band Min</label>
            <input
              type="number"
              name="price_band_min"
              value={formData.price_band_min}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Price Band Max</label>
            <input
              type="number"
              name="price_band_max"
              value={formData.price_band_max}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Open Date</label>
            <input
              type="date"
              name="open_date"
              value={formData.open_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Close Date</label>
            <input
              type="date"
              name="close_date"
              value={formData.close_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Issue Info */}
        <div>
          <label className="block font-semibold mb-1">Issue Size (in Cr.)</label>
          <input
            type="text"
            name="issue_size_crores"
            value={formData.issue_size_crores}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Issue Type</label>
          <input
            type="text"
            name="issue_type"
            value={formData.issue_type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Listing Date</label>
          <input
            type="date"
            name="listing_date"
            value={formData.listing_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block font-semibold mb-1">Company Logo</label>
          <div className="flex items-center gap-4">
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <label
              htmlFor="logo-upload"
              className="bg-violet-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-violet-700"
            >
              Upload
            </label>
            {logoPreview && (
              <>
                <button
                  type="button"
                  onClick={handleLogoDelete}
                  className="text-red-600 font-semibold px-3 py-1 border rounded hover:bg-red-100"
                >
                  Delete
                </button>
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="h-16 w-16 rounded object-cover border"
                />
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register IPO
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
