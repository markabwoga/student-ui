import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Heade from "./components/Heade";
import AddStudent from "./components/AddStudent";
import Card from "./components/Card";
import Table from "./components/Table";
import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  // Fetch students from backend when app loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/students"); // Spring Boot endpoint
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Router>
      <Heade />

      <div className="p-6">
        <Routes>
          {/* Add student form */}
          <Route path="/" element={<AddStudent />} />

          {/* Cards view */}
          <Route
            path="/Cards"
            element={
              <div className="flex flex-wrap">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <Card
                      key={index}
                      name={`${student.firstname} ${student.lastname}`}
                      age={student.age}
                      course={student.course}
                      batch={student.batch}
                    />
                  ))
                ) : (
                  <p>No students found.</p>
                )}
              </div>
            }
          />

          {/* Table view */}
          <Route path="/table" element={<Table students={students} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
