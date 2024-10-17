
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const HabitProgress = ({ habits }) => {
  return (
    <Card >
      
      <ListGroup variant="flush">
        {habits.map(habit => (
          <ListGroup.Item key={habit.id}>
            <h5>{habit.habitName}</h5>
            <p>Streak: {habit.streak}</p>
            <p>
              Completion Dates: 
              {Array.isArray(habit.completionDates) && habit.completionDates.length > 0
                ? habit.completionDates.join(', ')
                : 'None'}
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default HabitProgress;
