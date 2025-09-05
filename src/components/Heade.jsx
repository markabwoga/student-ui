import { Link } from "react-router-dom";

function Heade() {
  return (
    <div className="shadow pb-4 h-20 flex items-center justify-between px-6 bg-gray-100">
      <h1 className="font-thin text-2xl">Students Register</h1>
      <ul className="flex space-x-4">
        <li className="text-gray-500 hover:text-gray-700"><Link to="/">Add Students</Link></li>
        <li className="text-gray-500 hover:text-gray-700"><Link to="/table">Table</Link></li>
      </ul>
    </div>
  );
}

export default Heade;
