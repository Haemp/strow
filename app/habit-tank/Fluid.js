import FluidEngine from './FluidEngine.js';
import FluidAddCtrl from './FluidAddCtrl.js';
import MouseConstraint from './MouseConstraint.js';


const informationWindow = document.querySelector('f-card');
const balls = informationWindow.querySelector('span');
let selectedHabit = null;
document.addEventListener('habitselected', _ => {

    console.log('Habit has been selected', _.data)
    balls.innerText = _.data.circle.id;
    
    informationWindow.open();  
    
    selectedHabit = _.data;
    
    window.selectedHabit = selectedHabit;
})

const btn = document.querySelector('#btn')
const remove = document.querySelector('#remove')
btn.addEventListener('touchend', _ => {


    // otherwise a touch enabled browser would trigger
    // both click and touch listeners
    if(_ instanceof TouchEvent)
        _.preventDefault();

    
    selectedHabit.setTick();
})

remove.addEventListener('touchend', _ => {
    if(_ instanceof TouchEvent)
        _.preventDefault();

    selectedHabit.remove();
    selectedHabit = null;
    informationWindow.close();
})
