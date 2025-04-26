
import { useState, useEffect } from 'react';

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

  return (
    
   // <div className="company-list">
    <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {companies.map(company => (
        <div key={company.id} className="p-4 border rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">{company.name}</h2>
        
          {company.logo && (
            <img 
            src={company.logo} 
            alt={company.name} 
            className="w-24 h-24 object-contain" 
          />
          
    
          
          )}
           <div className="text-sm space-y-2">
  
          <p><span className="font-semibold">Price Band:</span> ₹{company.price_band_min} - ₹{company.price_band_max}</p>
          <p><span className="font-semibold">Open Date:</span> {company.open_date}</p>
          <p><span className="font-semibold">Close Date:</span> {company.close_date}</p>
          <p><span className="font-semibold">Issue Size:</span> ₹{company.issue_size_crores} crores</p>
          <p><span className="font-semibold">Issue Type:</span> {company.issue_type}</p>
          <p><span className="font-semibold">Listing Date:</span> {company.listing_date}</p>
        </div>
        </div>
      ))}
    </div>
    </div>
    
  );
 
   
}

export default Companies;
