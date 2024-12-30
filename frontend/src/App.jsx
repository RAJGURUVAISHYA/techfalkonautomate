import React, { useState } from 'react';
import './App.css';

function App() {
  const [mediaFile, setMediaFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [replyType, setReplyType] = useState('comment');
  const [replyMessage, setReplyMessage] = useState('');
  const [message, setMessage] = useState('');

  const handlePostContent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media', mediaFile);
    formData.append('caption', caption);

    const response = await fetch('https://editingassets.com:5428/post-content', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(`Post created successfully with ID: ${result.result.id}`);
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  const handleSetAutoReply = async (e) => {
    e.preventDefault();
    const endpoint = replyType === 'comment' ? 'https://editingassets.com:5428/auto-comment-reply' : 'https://editingassets.com:5428/auto-dm-reply';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ replyMessage }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(`Automatic ${replyType} reply set: ${result.message}`);
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  return (
    <div className="container">
      <h1>Instagram Automation</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handlePostContent}>
        <h2>Post Content</h2>
        <label htmlFor="media">Media File:</label>
        <input type="file" id="media" onChange={(e) => setMediaFile(e.target.files[0])} required />
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} required />
        <button type="submit">Post Content</button>
      </form>
      <form onSubmit={handleSetAutoReply}>
        <h2>Automatic Replies</h2>
        <label htmlFor="replyType">Reply Type:</label>
        <select id="replyType" value={replyType} onChange={(e) => setReplyType(e.target.value)} required>
          <option value="comment">Comment Reply</option>
          <option value="dm">DM Reply</option>
        </select>
        <label htmlFor="replyMessage">Reply Message:</label>
        <input type="text" id="replyMessage" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} required />
        <button type="submit">Set Automatic Reply</button>
      </form>
    </div>
  );
}

export default App;