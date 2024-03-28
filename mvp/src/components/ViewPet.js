import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function ViewPet() {
  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
            <div>
              <p className="checkin-time">View Pet</p>
            </div>
        </div>
      </div>
    </div>
  );
}