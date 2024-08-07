import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetailView = ({ type, id, onClose }) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/${type}/${id}/`);
        setDetail(response.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [type, id]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mb-4">Close</button>
        <h2 className="text-xl font-bold mb-4">{detail.name || detail.title}</h2>
        <pre className="whitespace-pre-wrap">{JSON.stringify(detail, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DetailView;