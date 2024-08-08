import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  }, [type, id]);

  return (
    <div className="fixed inset-0 bg-starwars-secondary bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
        {details ? (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-starwars-primary">{details.name || details.title}</h2>
              <p>ID: {id}</p>
            </div>
            <div className="mt-4">
              <pre>{JSON.stringify(details, null, 2)}</pre>
            </div>
            <div className="text-center mt-4">
              <button className="px-4 py-2 bg-starwars-buttonSecondary text-white rounded" onClick={onClose}>OK</button>
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