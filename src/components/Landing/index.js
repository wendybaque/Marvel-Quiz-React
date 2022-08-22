import React, {useRef, useEffect, useState, Fragment} from 'react'

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

  // Gère les conditions de l'afficahge des boutons.
  const displayBtn = btn && (
    <Fragment>
      <div className='leftBox'>
        <button className='btn-welcome'>Inscription</button>
      </div>
      <div className='rightBox'>
        <button className='btn-welcome'>Connexion</button>
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
