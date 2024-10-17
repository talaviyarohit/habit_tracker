
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        goals: '',
        motivation: ''
    });

    const fetchProfileData = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserProfile(userDoc.data());
            } else {
               
                setUserProfile(prevState => ({
                    ...prevState,
                    email: user.email
                }));
            }
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                
                await updateDoc(userDocRef, userProfile);
            } else {
            
                await setDoc(userDocRef, userProfile);
            }

            alert('Profile updated successfully!');
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>Edit Profile</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userProfile.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userProfile.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                disabled
                            />
                        </Form.Group>

                        <Form.Group controlId="formGoals">
                            <Form.Label>Personal Goals</Form.Label>
                            <Form.Control
                                type="text"
                                name="goals"
                                value={userProfile.goals}
                                onChange={handleChange}
                                placeholder="Enter your personal goals"
                            />
                        </Form.Group>

                        <Form.Group controlId="formMotivation">
                            <Form.Label>Motivation</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="motivation"
                                value={userProfile.motivation}
                                onChange={handleChange}
                                placeholder="What motivates you?"
                            />
                        </Form.Group>
                        
                        <Button className="mt-3" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
