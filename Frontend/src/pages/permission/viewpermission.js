// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getPermissions } from "../../HTTPHandler/api";
// import { toast } from "react-toastify";
// import './viewpermission.css'

// export  const Viewpermissions = () => {
//   const [permissions, setPermissions] = useState([]);
//   const userEmail = useSelector((state) => state.auth.user?.Email);

//   useEffect(() => {
//     if (userEmail) {
//       fetchPermissions(userEmail);
//     }
//   }, [userEmail]);

//   const fetchPermissions = async (email) => {
//     try {
//       const data = await getPermissions(email);
//       setPermissions(data);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//       toast.error("Error fetching permissions");
//     }
//   };

//   return (
//     <div className="permissions-table">
//       <h2>Permission Requests</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Current Date</th>
//             <th>Start Time</th>
//             <th>End Time</th>
//             <th>Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {permissions.map((permission) => (
//             <tr key={permission.id}>
//               <td>{permission.Email}</td>
//               <td>{permission.currentdate}</td>
//               <td>{permission.starttime}</td>
//               <td>{permission.endtime}</td>
//               <td>{permission.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPermissions } from "../../HTTPHandler/api";
import { toast } from "react-toastify";
import './viewpermission.css';
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export const Viewpermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const userEmail = useSelector((state) => state.auth.user?.Email);

  useEffect(() => {
    if (userEmail) {
      fetchPermissions(userEmail);
    }
  }, [userEmail]);

  const fetchPermissions = async (email) => {
    try {
      const data = await getPermissions(email);
      setPermissions(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Error fetching permissions");
    }
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <Button id="admin-back-btn" variant="outlined">
            Back
          </Button>
    <div className="permissions-table">
      
      <span id="permission" style={{fontWeight:600,fontSize:'17px'}}>View Permission :</span>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.Email}</td>
              <td>{permission.currentdate}</td>
              <td>{permission.starttime}</td>
              <td>{permission.endtime}</td>
              <td>{permission.reason}</td>
              <td>{capitalizeFirstLetter(permission.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <NavLink to="/main" style={{ textDecoration: "none" }}>
      <Button variant="outlined" id="perm-back">back</Button>
      </NavLink>
    
    </div>
  );
};

export default Viewpermissions;
