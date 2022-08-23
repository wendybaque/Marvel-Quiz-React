import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from '../Firebase';

const Logout = () => {

  const firebase = useContext(FirebaseContext)

  const [checked, setChecked] = useState(false);

  // Accès à Firebase :
  useEffect(() => {
    if(checked){
      firebase.signoutUser();
    }
  }, [checked, firebase]);
  
  const handleChange = (e) => {
    setChecked(e.target.checked);
  }

  return (
    <div className='logoutContainer'>
      <label className='switch'>
        <input type="checkbox"
        checked={checked}
        onChange={handleChange}
        />
        <span className='slider round'></span>
      </label>
    </div>
  )
}

export default Logout;
