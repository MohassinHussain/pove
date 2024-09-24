import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSend } from "react-icons/io";

function Main() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !prompt) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    try {
      const response = await axios.post('http://localhost:5000/api/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-500 to-indigo-600">
      <div className="bg-white  backdrop-blur-lg rounded-2xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-black font-bold text-3xl text-center mb-8">AI File Processor</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="file-upload" className="text-black text-lg">Upload File</label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="p-2 rounded bg-black text-white placeholder-white placeholder-opacity-70"
          />
          <label htmlFor="prompt" className="text-black text-lg">Enter Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt here..."
            rows={4}
            className="p-2 rounded bg-white bg-opacity-30 text-black placeholder-black placeholder-opacity-70 resize-y border-2" 
          />
          <button
            type="submit"
            disabled={!file || !prompt || isLoading}
            className={`flex justify-center p-2 rounded bg-gradient-to-br from-pink-800 to-indigo-600 text-white text-bold  text-lg transition duration-200
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-purple-600'} `}
          >
            {isLoading ? 'Processing...' : <>
                <IoIosSend className='font-bold mt-1.5' />
            Process File</>}
          </button>
        </form>
        {result && (
          <div className="mt-4 p-4 bg-red-400 bg-opacity-30 rounded">
            <h2 className="text-black text-lg mb-2">Result:</h2>
            <p className="text-black whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
