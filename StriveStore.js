const firebaseApp = require('./firebaseApp')
const firebase = require('firebase')

// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();
const habits = db.collection('habits')

class HabitModel{
    
    /**
     * 
     */
    addHabit(habit){
        habits.add(habit);
    }
    

    getAllHabits(){
        habits.get
    }

}
