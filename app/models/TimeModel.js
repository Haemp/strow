export default class TimeModel{

    static getTime(){
        return Date.now();
    }

    static daysSince(timestamp){
        const now = Date.now();
        const then = new Date(timestamp || 0).getTime();

        return (now - then) / (24 * 60 * 60 * 1000);
    }
}