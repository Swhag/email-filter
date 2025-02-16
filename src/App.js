import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [emails, setEmails] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Function to extract emails from input text
  const extractEmails = (text) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
  };

  // Handle change in the text input
  const handleTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    // Extract emails and remove duplicates using a Set
    const filteredEmails = extractEmails(text);
    const uniqueEmails = [...new Set(filteredEmails)];
    setEmails(uniqueEmails);
  };

  // Function to copy emails to clipboard and show a toast banner
  const copyEmails = () => {
    if (emails.length > 0) {
      const emailsText = emails.join('\n');
      navigator.clipboard.writeText(emailsText)
        .then(() => {
          setToastMessage("Emails copied to clipboard!");
          // Hide the toast after 3 seconds
          setTimeout(() => {
            setToastMessage('');
          }, 4000);
        })
        .catch((err) => {
          setToastMessage("Failed to copy emails.");
          setTimeout(() => {
            setToastMessage('');
          }, 4000);
        });
    } else {
      setToastMessage("No emails to copy.");
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left-side">
          <h2>Enter Text:</h2>
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder="Type something containing emails"
          />
        </div>
        <div className="right-side">
          <h2>Filtered Emails:</h2>
          <ul>
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
          <div className="notification">
            <div className="notification-message">
              Found {emails.length} email{emails.length !== 1 && 's'}
            </div>
          </div>
          <button className="copy-button" onClick={copyEmails}>
            Copy Emails
          </button>
        </div>
      </div>
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}

export default App;
