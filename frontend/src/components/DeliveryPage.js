import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DeliveryPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  
  // Access godown data from location.state
  const location = useLocation();
  const godown = location.state ? location.state.godown : null;

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Add button click
  const handleAddClick = async () => {
    try {
      console.log('Sending request to backend with input:', inputValue, 'and godown:', godown.name);
      const response = await axios.post('http://54.94.34.169:5000/api/checkAndAddItem', {
        input: inputValue,
        godownName: godown.name,  // Include godown name in the request body
      });
      console.log('Response from backend:', response);

      if (response.data.success) {
        setMessage('Item added successfully!');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Delivery Page</h2>
      {godown ? (
        <div style={styles.godownDetails}>
          <h3 style={styles.godownHeader}>Godown Details</h3>
          <p style={styles.godownText}><strong>Name:</strong> {godown.name}</p>
          <p style={styles.godownText}><strong>Address:</strong> {godown.address}</p>
        </div>
      ) : (
        <p style={styles.errorText}>No Godown Data Available</p>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Item"
        style={styles.input}
      />
      <button onClick={handleAddClick} style={styles.button}>Add</button>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff',
    padding: '20px',
  },
  header: {
    color: '#3f51b5',
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  godownDetails: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  godownHeader: {
    color: '#4caf50',
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  godownText: {
    fontSize: '1.1rem',
    color: '#333',
    margin: '5px 0',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80%',
    maxWidth: '400px',
    marginBottom: '15px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    fontSize: '1.1rem',
    color: '#333',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default DeliveryPage;
