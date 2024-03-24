import React, { useState } from "react"; // Import useState from React
import { useBudgets } from "../context/BudgetContext"; // Import useBudgets hook
import { Modal, Form, Button } from "react-bootstrap";

// EditBudgetModal.jsx

export default function EditBudgetModal({ show, handleClose, budget }) {
  const [name, setName] = useState(budget.name);
  const [max, setMax] = useState(budget.max);
  const { editBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    editBudget({ id: budget.id, name, max });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="max">
            <Form.Label>Max Amount</Form.Label>
            <Form.Control
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
