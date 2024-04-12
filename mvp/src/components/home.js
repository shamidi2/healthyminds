import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DogImage from './DogImage';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('basicbg.png');
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchBackgroundImage(user.uid);
      } else {
        setCurrentUser(null);
        setBackgroundImage('basicbg.png');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchBackgroundImage = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/backgroundImage`);

    get(userRef)
      .then((snapshot) => {
        const savedBackground = snapshot.val();
        if (savedBackground) {
          setBackgroundImage(savedBackground);
        }
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
      });
  };

  const changeBackground = (newBackground) => {
    setBackgroundImage(newBackground);
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}/backgroundImage`);
      set(userRef, newBackground)
        .catch((error) => console.error("Error updating background image:", error));
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal); 
  };

  const backgrounds = [
    { name: 'Starter Background', url: 'basicbg.png' },
        // attribution: vector by drogatnev from depositphotos
    { name: 'Rainbow Meadow', url: 'bg2.png' },
        // {/* attribution: <a href="https://www.freepik.com/free-vector/nature-park-scene-background-with-rainbow-sky_16457014.htm#query=cartoon%20garden&position=3&from_view=keyword&track=ais&uuid=f3d787e6-db30-45ea-8aa3-44689432194c">
        // Image by brgfx</a> on Freepik */}
    { name: 'Backyard Barbecue', url: 'bg4.png' },
        // attribution: <a href="https://www.vecteezy.com/free-vector/drawing">Drawing Vectors by Vecteezy</a>
    { name: 'Day at the Park', url: 'bg5.png' },
        // attribution: {/* <a href="https://www.vecteezy.com/free-vector/procreate-logo">Procreate Logo Vectors by Vecteezy</a> */}
    { name: 'Cabin in the Woods', url: 'bg6.png' },
    { name: 'City Living', url: 'bg7.png' },
        // attribution: file number 566024130 by irina on adobe stock
  ];

  return (
    <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '80vh', marginTop: '.4rem', borderRadius: '22px', marginBottom: '0rem' }}>
      <div className="bg-btns">
        {backgrounds.map((bg, index) => (
          <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>{bg.name}</button>
        ))}
      </div>
      <button className="outfit-buttons" onClick={toggleModal}>Change Pet Outfit</button>
      <NavLink to={{ pathname: "/viewpet", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}><DogImage /></NavLink>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Pet Outfit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>aliya and sara use this modal to hold the list of outfits the user has purchased - make them pics ofthe outfits
            and if they
            select a clothing item (pic) from this list they can automatically change pet's outfit!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
