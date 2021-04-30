import React, { useState, useEffect } from "react";
import Tasks from "../Tasks/Tasks";
import BreakModal from "../BreakModal/BreakModal";

import styled from "styled-components";

import Button from 'react-bootstrap/Button';

const TimerText = styled.div`
  text-align: center;
  font-size: 72px;
  color: ${(props) => (props.color)};
`;

const TimerContainer = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Timer = () => {
  const [time, setTime] = useState(1);
  const timer = new Date(time * 1000).toISOString().substr(14, 5);

  const [isActive, setIsActive] = useState(false);
  const [isTask, setIsTask] = useState(false);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);
  const [completedCycle, setCompletedCycle] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const enableTimer = () => {
    setTime(time);
    setIsTask(true);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setIsTask(false);
    setTime(1);
    setIsWorkPeriod(true);
  };

  const startBreak = () => {
    setIsWorkPeriod(false);
    setTime(1);
    setShowModal(false);
  }

  const completeCycle = () => {
    setTimeout(function() {
      alert('Break time is up');
    }, 10);
    reset();
      setCompletedCycle(true);
  }

  useEffect(() => {
    setCompletedCycle(false);
  }, [completedCycle])

  useEffect(() => {
    let intervalId;
    if (isActive) {
      if (time === 0 && isTask && isWorkPeriod) {
        setShowModal(true);
      }
      if (time === 0 && isTask && !isWorkPeriod) {
        completeCycle();
      }
      if (time > 0) {
        intervalId = setInterval(() => {
          setTime(time - 1);
        }, 1000);
      }
    }
    return () => clearInterval(intervalId);
  }, [time, isActive]);

  return (
    <TimerContainer>
        {isWorkPeriod ? <h2>Work Period</h2> : <h2>Break Period</h2>}
      <TimerText color={isWorkPeriod ? "#ff6347" : "#52A3EE"}>{timer}</TimerText>
      <Button onClick={() => startTimer()} disabled={!isTask || isActive} variant="primary">
        Start
      </Button>{' '}
      <Button onClick={() => pauseTimer()} disabled={!isActive} variant="secondary">
        Pause
      </Button>
      <Tasks addTask={enableTimer} reset={reset} completedCycle={completedCycle}/>
      <BreakModal showModal={showModal} startBreak={startBreak}/>
    </TimerContainer>
  );
};

export default Timer;
