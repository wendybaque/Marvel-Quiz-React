import React, {useEffect, useState} from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelNames, quizLevel}) => {

  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizSteps = levelNames.map(level => ({title : level.toUpperCase()}))
    setLevels(quizSteps);
  }, [levelNames]);
  
  return (
    <div className='levelsContainer' style={{background:'transparent'}}>
        <Stepper 
          steps={levels} 
          activeStep={quizLevel} 
          circleTop={0}
          activeTitleColor={'#d31017'}
          activeColor={'#d31017'}
          completeTitleColor={'#d31017'}
          completeColor={'#d31017'}
          completeBarColor={'#d31017'}
          barStyle={'dashed'}
          size={45}
          circleFontSize={20}
        />
    </div>
  )
}

export default React.memo(Levels);
