// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// export const Welcomemsg = () => {
//   const [welcomeMessage, setWelcomeMessage] = useState("");

//   const [typedMessage, setTypedMessage] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Array of different welcome messages related to attendance management software
//   const messages = [
//     "Welcome to our Attendance Management Software!",
//     "Hello there! Ready to track your attendance efficiently?",
//     "Greetings! Let's optimize your workforce management with us.",
//     "Empower your organization with our Attendance Management Software!",
//     "Simplify attendance tracking with our intuitive software!",
//     "Enhance productivity with our Attendance Management System!",
//     "Efficiently manage your workforce attendance with our software!",
//     "Stay organized and focused on attendance with our solution!",
//     "Transform your attendance management experience with us!",
//     "Maximize efficiency and accuracy with our attendance software!",
//     "Achieve better attendance tracking with our user-friendly system!",
//     "Take control of attendance records with our comprehensive solution!",
//     "Streamline attendance processes with our innovative software!",
//     "Improve accountability and transparency with our attendance tool!",
//     "Experience seamless attendance management with our platform!",
//     // Add more messages as needed, up to a maximum of 15
//   ];

//   const userEmail = useSelector((state) => state.auth.user.Email);

//   const [text, setText] = useState(
//     "Enhance productivity with our Attendance Management System!"
//   );
//   const [displayText, setDisplayText] = useState("");
//   useEffect(() => {
//     let currentIndex = 0;
//     let typedText = "";

//     const typeText = () => {
//       if (currentIndex < text.length) {
//         typedText += text[currentIndex];
//         setDisplayText(typedText);
//         currentIndex++;
//         setTimeout(typeText, 170); // Call typeText again after the specified speed
//       } else {
//         currentIndex = 0; // Reset currentIndex to type text again
//         typedText = ""; // Reset typedText to type text again
//         setTimeout(typeText, 150); // Call typeText again after the specified speed
//       }
//     };

//     typeText(); // Start typing immediately

//     return () => clearTimeout(); // Clean up the timeout when the component unmounts
//   }, [text, 150]);

//   return (
//     // <div>
//     //   <h1 style={{marginLeft:'50px'}}>{displayText}</h1>

//     //   <br></br>
//     //   {/* {userEmail} */}
//     // </div>
//     <div
//       style={{
//         minHeight: "120px",
//         display: "flex",
//         alignItems: "center",
//         marginLeft: "50px",
//       }}
//     >
//       <h1>{displayText}</h1>
//     </div>
//   );
// };



import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  margin-left: 45px;

  @media (max-width: 1200px) {
    margin-left: 80px;
  }

  @media (max-width: 768px) {
    margin-left: 120px;
    margin-top: 30px;
    
  }

  @media (max-width: 480px) {
    margin-left: 10px;
  }
`;

const Text = styled.span`
  font-size: 1.2rem;

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Welcomemsg = () => {
  const text = "Reliable Attendance tracking at your fingertips.";
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};
