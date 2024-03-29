import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from 'react-router-dom';

function Help() {
  return (
    <div className="profile-body">
    <div className="flex-container-profile">
    <div className="profile-card">
      <h2 className="about-help">About & Help</h2>
      <Accordion className="accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Disclaimer</Accordion.Header>
        <Accordion.Body>
        Our website and all content displayed on this website are not to be perceived as or relied upon 
        in any way as medical advice or mental health advice. The information provided through our 
        website or content is not intended to be a substitute for professional medical advice, 
        diagnosis or treatment that can be provided by a licensed or 
        registered health care professional. Do not disregard professional medical advice or delay 
        seeking professional advice because of information you have read on this website, its content, or 
        received from us. We are not providing health care, medical or therapy services or attempting to 
        diagnose, treat, prevent or cure in any manner whatsoever any physical ailment, or 
        any mental or emotional issue, disease or condition. We are not giving medical, 
        psychological, or religious advice whatsoever. We do not have the qualifications, licenses, or 
        certifications to provide medical or mental health advice.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Send Feedback</Accordion.Header>
        <Accordion.Body>
        Feel free to send any feedback or suggestions you have to help us improve our app! 
        <br></br>Google Form to send feedback: https://forms.gle/SNhx7UuDDwFHSNTK8
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <NavLink className="back-link" to="/profile"><p className="back-help">← Back</p></NavLink>
    </div>
    </div>
    </div>
  );
}

export default Help;