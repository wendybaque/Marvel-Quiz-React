import React, {useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

  // Via useRef : dit que la div rouge est l'afficahge de base/de référence.
  const refWolverine = useRef(null);

  // Affiche les griffes et les retire au bout de 3s.
  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true)
    }, 1500);
  }, [])

  // Gère l'afficahge des boutons d et g.
  const [btn, setBtn] = useState(false);
  
  // Gère l'afficahge des griffes gauches lors du passage de la souris.
  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  }

  // Gère l'affichage des griffes droites lors du passage de la souris.
  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  }

  // Efface l'image des griffes quand la souris ne survole plus la div.
  const clearImg = () => {
    if(refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg")
    } else if(refWolverine.current.classList.contains("rightImg")) {
      refWolverine.current.classList.remove("rightImg")
    }
  }

  // Gère les conditions de l'affichage des boutons.
  const displayBtn = btn && (
    <Fragment>
      <div className='leftBox' onMouseOver={setLeftImg} onMouseOut={clearImg}>
        <Link to="/signup" className='btn-welcome'>Inscription</Link>
      </div>
      <div className='rightBox' onMouseOver={setRightImg} onMouseOut={clearImg}>
      <Link to="/login" className='btn-welcome'>Connexion</Link>
      </div>
    </Fragment>
  )

  return (
    <main ref={refWolverine} className='welcomePage'>
      {displayBtn}
    </main>
  )
}

export default Landing;
