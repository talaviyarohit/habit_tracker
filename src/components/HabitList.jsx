
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { ListGroup, Button } from 'react-bootstrap';

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habitCollection = await getDocs(collection(db, 'habits'));
      setHabits(habitCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchHabits();
  }, []);

  const markComplete = async (habit) => {
    const habitRef = doc(db, 'habits', habit.id);
    const today = new Date().toISOString().split('T')[0];

    
    const completionDates = habit.completionDates || [];

    
    if (completionDates.includes(today)) {
      alert('You have already marked this habit as complete today!');
      return;
    }

    try {
      await updateDoc(habitRef, {
        completed: true,
        streak: habit.streak + 1,
        completionDates: [...completionDates, today],
      });
      alert('Habit marked as complete!');
    } catch (error) {
      console.error('Error marking habit as complete: ', error);
    }
  };

  return (
    <ListGroup>
      {habits.map((habit) => (
        <ListGroup.Item key={habit.id}>
          <h5>{habit.habitName}</h5>
          <p>Goal: {habit.goal}</p>
          <p>Start Date: {habit.startDate}</p>
          <p>Frequency: {habit.frequency}</p>
          <p>Streak: {habit.streak}</p>
          <Button variant="success" onClick={() => markComplete(habit)}>Mark as Complete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default HabitList;
