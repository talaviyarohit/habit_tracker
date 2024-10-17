// src/context/HabitContext.js
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import React, { createContext, useContext, useState } from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const addHabit = async (habit) => {
    await addDoc(collection(db, 'habits'), habit);
    fetchHabits(); // Fetch updated list after adding
  };

  const fetchHabits = async () => {
    const habitSnapshot = await getDocs(collection(db, 'habits'));
    const habitList = habitSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHabits(habitList);
  };

  const markHabitComplete = async (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    const habitDoc = doc(db, 'habits', habitId);
    const habit = habits.find((h) => h.id === habitId);
    const updatedDates = habit.completionDates ? [...habit.completionDates, today] : [today];
    
    await updateDoc(habitDoc, { completionDates: updatedDates });
    
    setHabits((prev) => 
      prev.map(h => h.id === habitId ? { ...h, completionDates: updatedDates } : h)
    );
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, fetchHabits, markHabitComplete }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
