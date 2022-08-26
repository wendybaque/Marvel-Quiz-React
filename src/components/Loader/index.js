import React, { Fragment } from 'react'

const Loader = ({loadingMsg, styling}) => {
  return (
    <Fragment>
        <div className='loader'></div>
        <p>
            {styling}
            {loadingMsg}
        </p>
    </Fragment>
  )
}

export default Loader;
