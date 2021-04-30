import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ListGroup from 'react-bootstrap/ListGroup';


const Container = styled.div`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  text-align: left;

  h3{
    text-align: center;
  }
`;

const CompletedTasks = ({ completedTasks }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(completedTasks);
  }, [completedTasks]);

  return (
    <Container>
          <h3>Completed Tasks</h3>
          <ListGroup>
          {list.map((task) => (
            <ListGroup.Item key={task}>{task}</ListGroup.Item>
          ))}
          </ListGroup>
    </Container>
  );
};

export default CompletedTasks;
