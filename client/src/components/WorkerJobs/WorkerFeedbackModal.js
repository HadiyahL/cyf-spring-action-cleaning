import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const WorkerFeedbackModal = ({ isOpen, toggle, feedback, worker }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Message from {worker}</ModalHeader>
        <ModalBody>
          <p>{feedback}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

WorkerFeedbackModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  feedback: PropTypes.string,
  worker: PropTypes.string,
};

export default WorkerFeedbackModal;
