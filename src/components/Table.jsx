import React, { useEffect, useState } from 'react';

function Table() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/v1/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/v1/student/${id}`, { method: 'DELETE' });
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleUpdate = (student) => {
    setEditingStudent(student.id);
    setUpdatedData(student);
  };

  const handleSaveUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/v1/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setEditingStudent(null);
        fetchStudents(); // Refresh the list
      } else {
        console.error('Failed to update student');
      }
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleCancelUpdate = () => {
    setEditingStudent(null);
    setUpdatedData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 m-4 rounded-lg shadow-lg">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-200">
          <tr className="text-thin">
            <th className="px-4 py-2 border text-gray-600">Name</th>
            <th className="px-4 py-2 border text-gray-600">Age</th>
            <th className="px-4 py-2 border text-gray-600">Course</th>
            <th className="px-4 py-2 border text-gray-600">Batch</th>
            <th className="px-4 py-2 border text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            editingStudent === student.id ? (
              <tr key={student.id}>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    name="firstName"
                    value={updatedData.firstName || ''}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    name="age"
                    value={updatedData.age || ''}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    name="course"
                    value={updatedData.course || ''}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    name="batch"
                    value={updatedData.batch || ''}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    onClick={() => handleSaveUpdate(student.id)}
                    className="bg-green-500 hover:bg-green-700 rounded-2xl px-4 py-2 font-bold text-gray-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelUpdate}
                    className="bg-gray-500 hover:bg-gray-700 rounded-2xl px-4 py-2 font-bold text-gray-200"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={student.id}>
                <td className="px-4 py-2 border">{student.firstName}</td>
                <td className="px-4 py-2 border">{student.age}</td>
                <td className="px-4 py-2 border">{student.course}</td>
                <td className="px-4 py-2 border">{student.batch}</td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    onClick={() => handleUpdate(student)}
                    className="bg-blue-500 hover:bg-blue-700 rounded-2xl px-4 py-2 font-bold text-gray-200"
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 rounded-2xl px-4 py-2 font-bold text-gray-200"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;