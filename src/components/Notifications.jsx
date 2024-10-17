
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [motivationMessage, setMotivationMessage] = useState('');

  const fetchNotifications = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setNotifications(userDoc.data().reminders || []);
        setMotivationMessage(userDoc.data().motivationMessage || '');
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCompleteHabit = async (index) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const updatedReminders = notifications.filter((_, i) => i !== index);

      await updateDoc(userDocRef, { reminders: updatedReminders });
      setNotifications(updatedReminders);

      
      alert(motivationMessage || "Well done! Keep going!");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>Habit Reminders</Card.Header>
        <Card.Body>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Text>{notification}</Card.Text>
                    <Button
                      variant="success"
                      onClick={() => handleCompleteHabit(index)}
                    >
                      Complete Habit
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>No current reminders.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Notifications;
