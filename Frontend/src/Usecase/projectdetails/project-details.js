import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Image from "./s.png";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Projectdetails() {
  const email = useSelector((state) => state.auth.user.Email);
  const roleid = useSelector((state) => state.auth.user.RoleId);
  console.log("roleid :", roleid);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);

  const [personEmail, setPersonEmail] = useState([]);

  const [employees, setEmployees] = useState([]);
  console.log('email', personEmail);
  //api to fetch names
  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setNames(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee names!', error);
      });
  }, []);

  // const handleChange1 = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   const selectedNames = typeof value === "string" ? value.split(",") : value;
  //   const selectedEmails = selectedNames.map(name => {
  //     const employee = names.find(emp => emp.name === name);
  //     return employee ? employee.email : "";
  //   });
  //   setPersonName(selectedNames);
  //   setPersonEmail(selectedEmails);
  //   handleChange({ target: { name: "Team", value: selectedNames.join(",") } });
  // };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    const selectedNames = typeof value === "string" ? value.split(",") : value;
    
    // Update the logic to use `names` instead of `employee` for matching
    const selectedEmails = selectedNames.map(name => {
      const employee = names.find(emp => emp.name === name);
      return employee ? employee.email : "";
    });
  
    setPersonName(selectedNames);
    setPersonEmail(selectedEmails);
    handleChange({ target: { name: "Team", value: selectedNames.join(",") } });
  };
  
  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    Title: "",
    Assigner: email,
    Description: "",
    Team: "",
    Startdate: "",
    Deadline: "",
    Tools: "",
    Files: "",
  });

  const [submitted, setSubmitted] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   if (
  //     inputValue.Title.trim() === "" ||
  //     inputValue.Tools.trim() === "" ||
  //     !inputValue.Startdate ||
  //     !inputValue.Deadline
  //   ) {
  //     toast.error("Fill in all the required fields.");
  //     return;
  //   }
  //   axios
  //     .post("http://localhost:8000/project_infos", inputValue)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  //   toast.success("submitted successfully");
  //   setTimeout(() => {
  //     navigate("/user");
  //   }, 2000);
  //   setInputValue({
  //     Title: "",
  //     Email: email,
  //     Description: "",
  //     Team: "",
  //     Startdate: "",
  //     Deadline: "",
  //     Tools: "",
  //     Files: "",
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      inputValue.Title.trim() === "" ||
      inputValue.Tools.trim() === "" ||
      !inputValue.Startdate ||
      !inputValue.Deadline
    ) {
      toast.error("Fill in all the required fields.");
      return;
    }
  
    // Add emails to the inputValue
    const projectDetails = {
      ...inputValue,
      Emails: personEmail,  // Add the emails here
    };
  
    axios
      .post("http://localhost:8000/project_infos", projectDetails)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast.success("submitted successfully");
    setTimeout(() => {
      navigate("/user");
    }, 2000);
    setInputValue({
      Title: "",
      Assigner: email,
      Description: "",
      Team: "",
      Startdate: "",
      Deadline: "",
      Tools: "",
      Files: "",
    });
  };

  const [formImagePosition, setFormImagePosition] = useState("hidden1");
  useEffect(() => {
    const timeoutNo = setTimeout(() => {
      setFormImagePosition("visibled");
    }, 1000);
    return () => clearTimeout(timeoutNo);
  }, []);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSidebarOpen(true);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="project-details-container">
      <img src={Image} alt="Left Image" id="pr-image" style={{ width: "360px", height: "360px" }} />
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <p>Project Details</p>
          <div id="left-container">
          
            <div id="right-container">
              <form onSubmit={handleSubmit} id="form1">
                <div id="form">
                  <tr>
                    <TextField
                      type="title"
                      variant="outlined"
                      name="Title"
                      id="title"
                      sx={{
                        width: "300px",
                        mb: 5,
                        position: "relative",
                        top: 40,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "25px", // Adding border ras
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                          fontFamily:
                            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                        },
                      }}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      label={isFocused ? "Title *" : "Title"}
                      autoFocus
                    />

                    <TextField
                      type="email"
                      variant="outlined"
                      autoFocus
                      name="Email"
                      value={inputValue.Assigner}
                      sx={{
                        width: "300px",

                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "25px", // Adding border radius
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-disabled fieldset": {
                            borderColor: "white",
                          },
                          "& input": {
                            color: "white !important",
                          },
                          "&.Mui-disabled input": {
                            color: "white !important", // Change the color of the input text when disabled
                          },
                          "&.Mui-disabled .MuiInputBase-input": {
                            color: "white !important",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-disabled": {
                          color: "white",
                        },
                      }}
                      onChange={handleChange}
                      id="email"
                      disabled // Make the TextField not editable
                      style={{
                        position: "relative",
                        bottom: -40,
                        left: 30,
                        fontSize: "12px",
                        color: "white", // Change the color of the value
                        background: "white",
                        borderRadius: "25px",
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "15px",
                          fontFamily:
                            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                        },
                      }}
                    />
                  </tr>
                  <tr>
                    <TextField
                      type="Description"
                      variant="outlined"
                      multiline
                      rows={2}
                      autoFocus
                      name="Description"
                      sx={{
                        width: "300px",
                        mb: 5,
                        position: "relative",
                        top: 70,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "25px", // Adding border radius
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                      onChange={handleChange}
                      id="description"
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                          fontFamily:
                            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                        },
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      label={isFocused ? "Description *" : "Description"}
                    />
                    
                    <FormControl
                      sx={{
                        m: 1,
                        width: 300,
                        position: "relative",
                        bottom: -65,
                        right: -20,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "25px", // Adding border radius
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    >
                      <InputLabel
                        id="demo-multiple-name-label"
                        style={{ fontSize: "14px", color: "white" }}
                      >
                        Team{isFocused && "*"}
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        style={{ height: "73px" }}
                        multiple
                        value={personName}
                        onChange={handleChange1}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {names.map((name) => (
                          <MenuItem key={name.name} value={name.name}>
                            <Checkbox checked={personName.indexOf(name.name) > -1} />
                            <ListItemText primary={name.name} />
                          </MenuItem>
                        ))}
                      </Select>
            
                    </FormControl>
                    


                  </tr>
                  <tr>
                    <input
                      type="date"
                      id="startdate"
                      name="Startdate"
                      onChange={handleChange}
                      style={{
                        width: "300px",
                        textAlign: "center",
                        height: "50px",
                        color: "white",
                        position: "relative",
                        bottom: "-100px",
                        borderRadius: "25px",
                      }}
                    />

                    <input
                      type="date"
                      id="enddate"
                      name="Deadline"
                      onChange={handleChange}
                      style={{
                        width: "300px",
                        textAlign: "center",
                        height: "50px",
                        color: "white",
                        position: "relative",
                        bottom: "-100px",
                        left: "30px",
                        borderRadius: "25px",
                      }}
                    />
                  </tr>
                  <tr>
                    <TextField
                      type="Tools"
                      variant="outlined"
                      autoFocus
                      name="Tools"
                      sx={{
                        width: "300px",
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "25px", // Adding border radius
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                      onChange={handleChange}
                      id="tool"
                      style={{
                        marginTop: "15px",
                        position: "relative",
                        top: 155,
                        left: 0,
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "13px",
                          fontFamily:
                            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                          color: "white",
                        },
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      label={isFocused ? "Tech stack *" : "Tech stack"}
                    />
                    {/* <input type='file' id='file1' name='Files' onChange={handleChange} style={{ position: 'relative', right: 0, bottom: 40 }} /> */}
                    <Button
                      id="attach-file1"
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      style={{ fontSize: "11px" }}
                    >
                      file
                      <input
                        type="file"
                        onChange={handleChange}
                        name="attachment"
                        style={{ display: "none" }}
                      />
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </tr>
                  <tr>
                    <button type="submit" id="sub">
                      Submit
                    </button>
                  </tr>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectdetails;
