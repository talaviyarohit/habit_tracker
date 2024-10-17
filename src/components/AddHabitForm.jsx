
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const AddHabitForm = () => {
  const [habitName, setHabitName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!habitName || !goal || !startDate) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      await addDoc(collection(db, 'habits'), {
        habitName,
        goal,
        startDate,
        frequency,
        completed: false, 
        streak: 0, 
        completionDates: [], 
      });
      alert('Habit added successfully!');
      setHabitName('');
      setGoal('');
      setStartDate('');
      setFrequency('daily');
    } catch (error) {
      console.error('Error adding habit: ', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="habitName">
        <Form.Label>Habit Name</Form.Label>
        <Form.Control
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter habit name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="goal">
        <Form.Label>Goal</Form.Label>
        <Form.Control
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="frequency">
        <Form.Label>Frequency</Form.Label>
        <Form.Select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Habit
      </Button>
    </Form>
  );
};

export default AddHabitForm;
