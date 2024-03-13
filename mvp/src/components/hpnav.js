import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function HappyPawsNav() {
  const [avatar, setAvatar] = useState('profileimage.png');
  const [coinCount, setCoinCount] = useState(0); 
  
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const fetchCoinCount = (user) => {
      if (user) {
        const userId = user.uid;
        const coinCountRef = ref(db, `users/${userId}/coinCount`);

        onValue(coinCountRef, (snapshot) => {
          const count = snapshot.val() || 0; 
          setCoinCount(count);
        });
      } else {
        setCoinCount(0); 
      }
    };

    fetchCoinCount(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(fetchCoinCount);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const updateAvatar = (user) => {
      if (user) {
        const userId = user.uid;
        const avatarRef = ref(db, `${userId}/userAvatar`);

        onValue(avatarRef, (snapshot) => {
          const avatarUrl = snapshot.val();
          if (avatarUrl) {
            setAvatar(avatarUrl);
          } else {
            setAvatar('profileimage.png'); 
          }
        });
      } else {
        setAvatar('profileimage.png'); 
      }
    };

    updateAvatar(auth.currentUser);
    const unsubscribe = auth.onAuthStateChanged(updateAvatar);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header>
      <h1><NavLink to="/home" style={{ color: '#f6f3eb', textDecoration: 'none'}}>happy paws</NavLink></h1>
      <nav>
        <ul>
          <li><NavLink to="/clothing" style={{ color: '#f6f3eb', textDecoration: 'none'}}><img className="store" src="store.png" alt="store icon" />Store</NavLink></li>
          <li><NavLink to="/checkin" style={{ color: '#f6f3eb', textDecoration: 'none'}}><img className="fire" src="checkinimg.png" alt="checkin icon" />Check in</NavLink></li>
          <li><img className="coins" src="coins.png" alt="coins icon" />{coinCount}</li> {/* Display coin count */}
          <li><img className="fire" src="fire.png" alt="fire icon" />16</li>
          <li><NavLink to="/profile"><img className="profileimage" src={avatar} alt="profile icon" /></NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
