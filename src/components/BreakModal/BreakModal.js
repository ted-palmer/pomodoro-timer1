import React from "react";
import { Modal, Button } from "react-bootstrap";

const BreakModal = ({ showModal, startBreak }) => {

    const handleStartBreak = () => {
        showModal = false;
        startBreak();
    }

  return (
    <Modal show={showModal} animation={null}>
      <Modal.Header>
        <Modal.Title>Times Up!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          If you finished the task, click the "Start Break" button. If you need
          more time, keep working on it.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleStartBreak} variant="primary">Start Break</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BreakModal;
