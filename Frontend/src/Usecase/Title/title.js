

import logo1 from "./pozent.png"
import logo2 from "./project-icon1.png"
import { TiTick } from "react-icons/ti";
import { DotLoader} from 'react-spinners';
import { BiCheckCircle } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";

function Titlecontent(){
  const [text, setText] = useState("Plan your everyday work...");
  const [displayText, setDisplayText] = useState('');
  const data = useSelector((state) => state.auth.user);
  const role=data.RoleId;
  console.log("jana role",data.RoleId)
  useEffect(() => {
    let currentIndex = 0;
    let typedText = '';

    const typeText = () => {
      if (currentIndex < text.length) {
        typedText += text[currentIndex];
        setDisplayText(typedText);
        currentIndex++;
        setTimeout(typeText, 170); // Call typeText again after the specified speed
      } else {
        currentIndex = 0; // Reset currentIndex to type text again
        typedText = ''; // Reset typedText to type text again
        setTimeout(typeText, 150); // Call typeText again after the specified speed
      }
    };

    typeText(); // Start typing immediately

    return () => clearTimeout(); // Clean up the timeout when the component unmounts
  }, [text, 150]);

  
 

  

    return <>
     <div className="title-box">
     
      
        <span id="right-tit">{displayText}</span>
        
        <div id="img-content">
        <img src={logo1} id="logo1"></img>
        </div>
             
       
      
       
        <div id="tot-title">
        <span  id="project1"> Project Management</span>
        <br></br>
        <span id="project2">Empower Your Projects, Elevate Your Success.</span> 
        </div>
       <div id="info-cont">
        <span id="line"> Easily assign tasks and prioritize what's most important to your team. Track your team's progress, set project timelines, and manage their work all in one place.</span>
        
        </div>
        
      
        {/* <Link to="/projectdetails" id="get-started">
          <button className="cta">
            <span>Get Started</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </Link> */}
        {role === 5 && (
          <Link to="/projectdetails" id="get-started">
            <button className="cta">
              <span>Get Started</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </Link>
        )}
    </div>

    
 
 
     </>
 
 }
 export default Titlecontent;
