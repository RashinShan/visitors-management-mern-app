import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Update from './update'; 





function Data() {
  
  const [data, setData] = useState([]);

  const [isUpdateVisible, setUpdateVisible] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleUpdateButtonClick = (id,name,email) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedEmail(email);
    setUpdateVisible(true);
  };

  const handleDeleteButtonClick = (id) => {
    
    fetch(`http://localhost:5000/Delete/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) 
      .then((result) => {
        console.warn(result);
        if (result) {
          alert('Data deleted successfully');
          fetchData(); 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData(); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

   
  return (
    <div className="p-4">
    <h1 className=" bg-blue-500  text-white p-4 mb-4 rounded-lg text-2xl font-bold mb-4 text-center">Visitors Names</h1>
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Visitor Name</th>
          <th className="p-2">Visitor Email</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id} className="border-t">
            <td className="p-2 text-center">{item.name}</td>
            <td className="p-2 text-center">{item.email}</td>
            <td className="p-2 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 text-center"
                onClick={() => handleUpdateButtonClick(item._id, item.name, item.email)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
                onClick={() => handleDeleteButtonClick(item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
    {isUpdateVisible && (
      <Update id={selectedId} initialName={selectedName} initialEmail={selectedEmail} />
    )}
  </div>
  



  );


 
}

export default Data;
