import React, { Fragment } from 'react'

const ProgressBar = () => {
  return (
    <Fragment>
        <div className='percentage'>
            <div className='progressPercent'>Question</div>
            <div className='progressPercent'>Progression</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' style={{width:'10%'}}></div>
        </div>
    </Fragment>
  )
}

export default ProgressBar;
