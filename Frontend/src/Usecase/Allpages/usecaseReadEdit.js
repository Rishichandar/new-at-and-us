import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { MdOutlineTask } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { BiTask } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import "./usecaseReadEdit.css";

export const UsecaseReadEdit = () => {
  const location = useLocation();
  // const title = location.state?.title;
  // const email = location.state?.email;
  const [usecases, setUsecases] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [editedUsecase, setEditedUsecase] = useState({});
  const [title, setTitle] = useState(localStorage.getItem("title") || location.state?.title || "");
  console.log("Title",title);
  
  const data = useSelector((state) => state.auth.user);
  const email =data.Email;
  const navigate = useNavigate();
  

   // Store email in local storage if it's available in location.state
  //  useEffect(() => {
  //   if (location.state?.title) {
  //     localStorage.setItem("title", location.state.title);
  //     setEmail(location.state.title);
  //   }
  // }, [location.state]);

  // useEffect(() => {
  //   const fetchUsecases = async () => {
  //     try {
  //       if (!title) return;
  //       const response = await axios.get(
  //         `http://localhost:8000/usecases?title=${encodeURIComponent(title)}`
  //       );
  //       setUsecases(response.data);
  //     } catch (error) {
  //       console.error("Error fetching use cases:", error);
  //     }
  //   };
  //   fetchUsecases();
  // }, [title]);

  // const Email = useSelector((state) => state.auth.user.Email);
  // console.log("email id :", Email);
  // useEffect(() => {
  //   const fetchUsecases = async () => {
  //     try {
  //       if (!email) return;
  //       const response = await axios.get(
  //         `http://localhost:8000/usecases?title=${encodeURIComponent(email)}`
  //       );
  //       setUsecases(response.data);
  //     } catch (error) {
  //       console.error("Error fetching use cases:", error);
  //     }
  //   };
  //   fetchUsecases();
  // }, [title]);
  const data1 = useSelector((state) => state.auth.user);
  let Roleid = data1.RoleId;
  useEffect(() => {
    const fetchUsecases = async () => {
      try {
        if (!email) return;

        // Add roleid to the query parameters
        const response = await axios.get(
          `http://localhost:8000/usecases`, 
          { params: { email: email, Roleid,title } } // Passing roleid in query params
        );
        
        setUsecases(response.data);
      } catch (error) {
        console.error("Error fetching use cases:", error);
      }
    };

    fetchUsecases();
  }, [email, Roleid]); // Added roleid as a dependency


  const handleEditClick = (id) => {
    setEditModeId(id);
    const usecaseToEdit = usecases.find((usecase) => usecase.id === id);
    setEditedUsecase(usecaseToEdit);
    toast.success("Edit mode on");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUsecase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/usecases/${editedUsecase.id}`,
        editedUsecase
      );
      setEditModeId(null);
      setEditedUsecase({});
      toast.success("Updated successfully");
      const response = await axios.get(
        `http://localhost:8000/usecases?title=${encodeURIComponent(title)}`
      );
      setUsecases(response.data);
    } catch (error) {
      console.error("Error updating use case:", error);
    }
  };

  const back = () => {
    navigate("/user");
  };
  const adminBack = () => {
    navigate("/admin");
  };

  const totask = (title, summary) => {
    navigate("/task", { state: { title: title, summary: summary } });
  };

  const handleCancelEdit = () => {
    setEditModeId(null);
    setEditedUsecase({});
    toast.info("Edit mode cancelled");
  };

  // useState for use case task details
  const [error, setError] = useState(null);
  const [showYourInfo, setShowYourInfo] = useState(true); // State to control visibility
  const [showTab1, setShowTab1] = useState(true);
  const [toggleBarOpen, setToggleBarOpen] = useState(false);
  const [taskData, setTaskData] = useState([]);
  console.log(taskData.Date);
  const closeToggleBar = () => {
    // Close the toggle bar
    setToggleBarOpen(false);
    setShowTab1(true);
  };

  // for admin use case view


  // for viewing use case task details
  // const handleTaskButtonClick = async (summary) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/task_details/${summary}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch task data");
  //     }
  //     const jsonData = await response.json();
  //     setTaskData(jsonData);
  //     setToggleBarOpen(true);
  //     setShowTab1(!showTab1);
  //     setShowYourInfo(false);
  //     setError(null);
  //   } catch (error) {
  //     console.log("summary:", summary);
  //     toast.error("didn't add any task details");
  //   }
  // };
  const handleTaskButtonClick = async (summary, reporterid) => {
    try {
      const response = await fetch(
        `http://localhost:8000/task_details?summary=${encodeURIComponent(summary)}&email=${encodeURIComponent(reporterid)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch task data");
      }
      const jsonData = await response.json();
      setTaskData(jsonData);
      setToggleBarOpen(true);
      setShowTab1(!showTab1);
      setShowYourInfo(false);
      setError(null);
    } catch (error) {
      console.log("summary:", summary);
      toast.error("Didn’t add any task details");
    }
  };
  

  const downloadCSV = (data) => {
    const headers = [
      "Project-id",
      "Summary",
      "Team",
      "status",
      "Enddate",
      "ReporterID",
      "File",
      "Description",
      "Title",
    ];
    const csvRows = [
      headers.join(","), // Join headers with commas
      ...data.map((row) => Object.values(row).join(",")), // Map data rows to CSV format
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const downloadAllCSV1 = () => {
    downloadCSV(usecases);
  };

  const downloadCSV2 = (data) => {
    const headers = [
      "Id",
      "Date",
      "Dailytask",
      "Email",
      "Title",
      "Time",
      "Usecase",
    ];
    const csvRows = [
      headers.join(","), // Join headers with commas
      ...data.map((row) => {
        // Map data rows to CSV format
        return [
          row.Id,
          row.Date.substring(0, 10), // Extract the date part
          row.Dailytask,
          row.Email,
          row.Title,
          row.Time,
          row.Usecase,
        ].join(",");
      }),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const downloadAllCSV2 = () => {
    downloadCSV2(taskData);
  };


  return (
    <>
      {(Roleid === 2) && (
        <span id="your-info1">
          My Usecase
          <IoMdArrowDropdown id="icon1" />
        </span>
      )}
  
      {(Roleid === 5) && (
        <span id="your-info1">
          All Usecase
          <IoMdArrowDropdown id="icon1" />
        </span>
      )}
      <Stack spacing={2} direction="row">
        {Roleid === 1 ? (
          <Button id="admin-back-btn" variant="outlined" onClick={adminBack}>
            Back
          </Button>
        ) : (
          <Button id="back-btn3" variant="outlined" onClick={back}>
            Back
          </Button>
        )}
      </Stack>
      {Roleid === 5 && (
        <button id="usecase-down" onClick={downloadAllCSV1}>
          Download
        </button>
      )}
      <div className="table-container1">
        <div className="scrollable-container">
          <table id="usecase-table">
            <thead>
              <tr>
                <th id="Th">Title</th>
                <th id="Th">Summary</th>
                <th id="Th" className="scrollable-cell3">Description</th>
                <th id="Th">Team</th>
                <th id="Th">Status</th>
                <th id="Th">End Date</th>
                {Roleid !== 1 && <th colSpan="4" id="Th">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {usecases.length === 0 ? (
                <tr>
                  <td colSpan="9">No use cases added</td>
                </tr>
              ) : (
                usecases.map((usecase) => (
                  <tr key={usecase.id}>
                    <td>{usecase.title}</td>
                    <td>
                      {editModeId === usecase.id ? (
                        <input
                          id="edit-input"
                          type="text"
                          name="summary"
                          value={editedUsecase.summary}
                          onChange={handleInputChange}
                          className="enabled-input"
                        />
                      ) : (
                        usecase.summary
                      )}
                    </td>
                    <td
                      className={
                        editModeId === usecase.id ? "editing" : "scrollable-cell3"
                      }
                    >
                      {editModeId === usecase.id ? (
                        <input
                          id="edit-input"
                          type="text"
                          name="description"
                          value={editedUsecase.description}
                          onChange={handleInputChange}
                          className="enabled-input"
                        />
                      ) : (
                        usecase.description
                      )}
                    </td>
                    <td>
                      {editModeId === usecase.id ? (
                        <input
                          id="edit-input"
                          type="text"
                          name="team"
                          value={editedUsecase.team}
                          onChange={handleInputChange}
                          className="enabled-input"
                        />
                      ) : Array.isArray(usecase.team) ? (
                        usecase.team.join(", ")
                      ) : (
                        usecase.team
                      )}
                    </td>
                    <td>
                      {editModeId === usecase.id ? (
                        <input
                          id="edit-input"
                          type="text"
                          name="status"
                          value={editedUsecase.status}
                          onChange={handleInputChange}
                          className="enabled-input"
                        />
                      ) : (
                        usecase.status
                      )}
                    </td>
                    <td>
                      {editModeId === usecase.id ? (
                        <input
                          id="edit-input"
                          type="date"
                          name="enddate"
                          value={editedUsecase.enddate}
                          onChange={handleInputChange}
                          className="enabled-input"
                        />
                      ) : // new Date(usecase.enddate).toLocaleDateString()
                        usecase.enddate ? (
                          new Date(usecase.enddate).toLocaleDateString()
                        ) : (
                          "no date added"
                        )}
                    </td>
                    {Roleid !== 1 && (
                      <>
                        {editModeId === usecase.id ? (
                          <td>
                            <button
                              id="edit-submit"
                              onClick={handleSubmit}
                              className="enabled-btn"
                              disabled={
                                editedUsecase.summary === "" ||
                                editedUsecase.description === "" ||
                                editedUsecase.team === "" ||
                                editedUsecase.status === "" ||
                                editedUsecase.enddate === ""
                              }
                            >
                              Submit
                            </button>
                          </td>
                        ) : (
                          Roleid === 5 && (
                            <td>
                              <button
                                id="edit-submit"
                                className="disabled-btn"
                                disabled
                              >
                                Submit
                              </button>
                            </td>
                          )
                        )}
  
                        {editModeId === usecase.id ? (
                          <td>
                            <button id="edit-cancel" onClick={handleCancelEdit}>
                              <IoClose size={20} />
                            </button>
                          </td>
                        ) : (
                          Roleid === 5 && (
                            <td>
                              <span
                                onClick={() => handleEditClick(usecase.id)}
                                id="usecase-edit"
                              >
                                <MdEdit />
                              </span>
                            </td>
                          )
                        )}
                        {Roleid === 2 && (
                          <td>
                            <span
                              className="task1"
                              onClick={() => totask(usecase.title, usecase.summary)}
                              id="taskdetails"
                              size={30}
                            >
                              <MdOutlineTask size={19} />
                            </span>
                          </td>
                        )}
                      </>
                    )}
  
                    <td>
                      <span
                        className="task"
                        onClick={() => handleTaskButtonClick(usecase.summary,usecase.reporterid)}
                        id="taskdetails"
                        size={30}
                      >
                        <BiTask size={18} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
  
      <div className={`toggle-bar ${toggleBarOpen ? "open" : ""}`}>
        <div className="toggle-bar-content">
        <div className="table-container2">
          <div className="scroll-container2">
            <table id="mini1">
              <thead>
                <tr>
                  <th id="Th" style={{ width: "35%" }}>Usecase</th>
                  <th id="Th" style={{ width: "40%" }}>Daily Task</th>
                  <th id="Th" style={{ width: "35%" }}>Date</th>
                  <th id="Th" style={{ width: "35%" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(taskData) &&
                  taskData.map((obj) => (
                    <tr key={obj.ID}>
                      <td style={{ width: "35%" }}>{obj.usecasetitle}</td>
                      <td style={{ width: "40%" }} className="scrollable-cell4">{obj.Dailytask}</td>
                      <td style={{ width: "35%" }}>{obj.Date.substring(0, 10)}</td>
                      <td style={{ width: "35%" }}>{obj.Time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          </div>
          <span onClick={closeToggleBar} id="close-bar">
            <IoClose />
          </span>
          <button onClick={downloadAllCSV2} id="down-al2">
            Download csv
          </button>
        </div>
      </div>
    </>
  );
  
};
