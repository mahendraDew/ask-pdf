'use client';

import React, { useState, useEffect } from 'react';

interface PDF {
  _id: string;
  filename: string;
}

export default function PDFUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [pdfs, setPdfs] = useState<PDF[]>([]);

  // Fetch PDFs from the backend
  const fetchPDFs = async () => {
    try {
      const res = await fetch('/api/pdfs');
      const data: PDF[] = await res.json();
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  useEffect(() => {
    fetchPDFs(); // Fetch PDFs on initial render
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Uploading...');

    try {
      const res = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setStatus(data.message);
      if (res.ok) {
        fetchPDFs(); // Refresh the list after upload
      }
    } catch (err) {
      setStatus('Failed to upload.');
      console.error(err);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} className='bg-gray-400 p-2 rounded-lg hover:bg-gray-300 border'>Upload PDF</button>
      {status && <p className='bg-green-300/10'>{status}</p>}

      <div className="pdf-list bg-blue-200">
        <h2 className='text-2xl mt-10'>Uploaded PDFs:</h2>
        <ul className='flex flex-col gap-1'>
          {pdfs.map((pdf) => (
            <li key={pdf._id} className='bg-gray-300'>
              <a href={`/api/pdfs/${pdf._id}`} target="_blank" rel="noopener noreferrer">
                {pdf.filename}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
