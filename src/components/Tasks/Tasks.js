import React, { useState, useEffect } from "react";
import CompletedTasks from "./CompletedTasks";
import styled from "styled-components";

import { Form, Button, ListGroup } from 'react-bootstrap';

const Container = styled.div`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const Tasks = ({ addTask, reset, completedCycle }) => {
  const [value, setValue] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (completedCycle) {
      setCompletedTasks((completedTasks) => [...completedTasks, currentTask]);
      setCurrentTask("");
      completedCycle = false;
    }
  }, [completedCycle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    setCurrentTask(value);
    addTask();
    setValue("");
  };

  const handleReset = () => {
    setValue("");
    setCurrentTask("");
    reset();
    setValue("");
  };

  return (
    <Container>
        {currentTask != "" ? <div><h5>Current Task</h5>
      <ListGroup.Item>{currentTask}</ListGroup.Item></div>: <></>}
      <br/>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="task"
            placeholder="Enter in a task"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Form.Group>
        <Button disabled={!value.length > 0} type="submit">
          Add Task
        </Button>{" "}
        <Button onClick={() => handleReset()} variant="secondary">
          Reset
        </Button>
      </Form>

      {completedTasks.length > 0 ? <CompletedTasks completedTasks={completedTasks} />: <></> }
      
    </Container>
  );
};

export default Tasks;
