import {calcTotalSleep} from "./calcStatistics";

export const filterByTimeOfDay = (dream, type) => {
    const dreamDay = dream.filter( item => item.timeOfDay === type )
    return calcTotalSleep(dreamDay)
}