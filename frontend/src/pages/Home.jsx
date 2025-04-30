
import { useState, useEffect } from 'react';
import logoImage from "./logo.png";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/companies/') // Make sure this URL matches your Django backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCompanies(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading companies...</div>;
  if (error) return <div>Error: {error}</div>;


 return(
  
  <div className="container mx-auto px-4 py-8">
 
 <div className="flex justify-start py-8 px-4">
        <img
          src={logoImage}
          alt="Page Logo"
          className="h-24 w-auto object-contain"
        />
      </div>

      <div className="px-4 py-6">
 
  <h1 className="text-5xl font-bold text-gray-800 mb-2">Upcoming IPO</h1>


  <p className="text-lg text-gray-600">
    Companies that have filed for an IPO with SEBI. Few details might be disclosed by the companies later.
  </p>
</div>
  
  <div className="grid grid-cols-3 gap-8 justify-items-center">
    {companies.map(company => (
      <div key={company.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-110 h-110">
        <div className="flex items-center gap-4 mb-6">
        {company.logo && (
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-24 h-24 object-contain mb-4"
          />
        )}

        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-4">{company.name}</h2>
        </div>
        <div className="w-full text-xl text-center space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Price Band</span>
            <span>{company.price_band_min && company.price_band_max ? `Rs ${company.price_band_min} – ${company.price_band_max}` : 'Not Issued'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Open</span>
            <span>{company.open_date || 'Not Issued'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Close</span>
            <span>{company.close_date || 'Not Issued'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Issue Size</span>
            <span>{company.issue_size_crores ? `${company.issue_size_crores} Cr.` : 'Not Issued'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Issue Type</span>
            <span>{company.issue_type || 'Not Issued'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Listing Date</span>
            <span>{company.listing_date || 'Not Issued'}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

 );
   
}

export default Companies;
