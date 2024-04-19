import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { NavLink, useLocation } from 'react-router-dom';
import { usePetImage } from './PetImageContext';

export default function MyCloset() {
  const [items, setItems] = useState({});
  const location = useLocation();
  const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';

  const { currentPetImage, updatePetImage } = usePetImage();
  const [basePetName, setBasePetName] = useState(''); 

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const itemsRef = ref(db, `users/${user.uid}/purchasedItems`);
        get(itemsRef).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Items loaded:", snapshot.val());
            setItems(snapshot.val());
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}/currentPet`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const fullPetName = snapshot.val(); // e.g., "dog1.png"
            const petName = fullPetName.replace(/\..*$/, ''); // Remove file extension
            setBasePetName(petName); // Set base pet name with numbers
          }
        });
      }
    });
  }, []);

  const handleItemClick = (itemName) => {
    const formattedItemName = itemName.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lower case
    const imageFileName = `${basePetName}${formattedItemName}.png`;
    updatePetImage(imageFileName);
  };



  return (
    <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="closet-card">
          <div className="closet-div">
            <p className="closet-title">My Closet</p>
            <div className='clothing-list'>
              {Object.values(items).map((item) => (
                <div key={item.itemName} className="clothing-item" onClick={() => handleItemClick(item.itemName)}>
                  <img className="img-closet" src={item.imgSrc} alt={item.itemName} />
                  <p className="p-closet">{item.itemName}</p>
                </div>
              ))}
            </div>
          </div>
          <NavLink to={{ pathname: "/viewpet", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}><p className="back-btn">Back</p></NavLink>
        </div>
      </div>
    </div>
  );
}


