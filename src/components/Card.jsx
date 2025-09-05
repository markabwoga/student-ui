import React, { useEffect, useState } from 'react';

function Card() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/v1/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };
  console.log(students);

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-wrap p-4">
      {students.map((s) => (
      <div key={s.id} className="bg-gray-400 h-56 w-40 rounded-2xl shadow p-2 m-4">
        <div className="flex flex-col justify-end text-gray-600 font-bold text-xs">
          <h1>Name: <span className="text-gray-100 font-serif">{s.firstName}</span></h1>
          <h1>Age: <span className="text-gray-100 font-serif">{s.age}</span></h1>
          <h1>Course: <span className="text-gray-100 font-serif">{s.course}</span></h1>
          <h1>Batch: <span className="text-gray-100 font-serif">{s.batch}</span></h1>
        </div>
      </div>
      ))}
    </div>
  );
}

export default Card;