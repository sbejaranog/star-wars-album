import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DetailView.css';

const DetailView = ({ type, id, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/${type}/${id}/`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();

    // Disable scrolling on the main page when the modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when the modal is closed
    };
  }, [type, id]);

  return (
    <div className="detail-view fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full max-h-[75vh] flex flex-col relative">
        {details ? (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold">{details.name || details.title}</h2>
              <p>ID: {id}</p>
            </div>
            <div className="mt-4 flex-grow overflow-y-auto">
              <pre>{JSON.stringify(details, null, 2)}</pre>
            </div>
            <div className="text-center mt-4">
              <button className="px-4 py-2 bg-starwars-buttonPrimary text-white rounded w-full" onClick={onClose}>OK</button>
            </div>
          </>
        ) : (
          <p className="text-center">Accediendo a la tarjeta de datos...</p>
        )}
      </div>
    </div>
  );
};

export default DetailView;