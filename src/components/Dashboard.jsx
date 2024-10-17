
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HabitProgress from './HabitProgress';
import HabitList from './HabitList'; 
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habitCollection = await getDocs(collection(db, 'habits'));
      setHabits(habitCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchHabits();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className='habit'>Your Daily Habits</Card.Header>
            <Card.Body className='habit'>
              <HabitList habits={habits} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Header className='habit'>Habit Progress</Card.Header>
            <Card.Body className='habit'>
              <HabitProgress habits={habits}  />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mt-4">
            <Card.Header className='habit'>Motivational Message</Card.Header>
            <Card.Body>
              <p>{getMotivationalMessage()}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


const getMotivationalMessage = () => {
  const messages = [
    "Keep going, you're doing great!",
    "Every step counts, stay consistent!",
    "Believe in yourself, and all that you are!",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Your only limit is you!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export default Dashboard;
