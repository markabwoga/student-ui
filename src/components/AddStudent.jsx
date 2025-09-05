import React, { useState } from 'react';

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    const student = { firstName, age: Number(age), course, batch };

    try {
      const response = await fetch('http://localhost:8081/api/v1/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage('Failed to add student: ' + errorText);
        return;
      }

      const data = await response.json();
      setMessage(`Student ${data.firstName} added successfully!`);
      setFirstName('');
      setAge('');
      setCourse('');
      setBatch('');
    } catch (error) {
      setMessage('Error: ' + error.message);
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFirstName('');
    setAge('');
    setCourse('');
    setBatch('');
    setMessage('');
  };

  return (
    <div className="border-b shadow max-w-2xl mx-auto">
      <div className="px-8 py-8">
        <h1 className="font-thin text-2xl tracking-wider">Add Student</h1>

        <div className="my-4">
          <label className="block text-gray-600 text-sm">First Name</label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 px-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="block text-gray-600 text-sm">Age</label>
          <input
            type="number"
            className="h-10 w-96 border mt-2 px-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="block text-gray-600 text-sm">Course</label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 px-2"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="block text-gray-600 text-sm">Batch</label>
          <input
            type="text"
            className="h-10 w-96 border mt-2 px-2"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>

        <div className="my-4 space-x-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AddStudent;
