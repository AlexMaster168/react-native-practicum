import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { formatDistanceStrict, differenceInMinutes } from "date-fns";
import { ru } from "date-fns/locale";
import { convertDateFromTime } from "../utils/convertFromTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/ru";
import { toDbPathMoment } from "../utils/firebaseHelpers";

const ref = async (date) => {
  const d = moment.isMoment(date) ? date : moment(d);

  let activeChild = JSON.parse(await AsyncStorage.getItem("@active_child"));
  if (!activeChild) {
    activeChild = JSON.parse(await AsyncStorage.getItem("@children"))[0];
  }
  return firebase
    .database()
    .ref(`${activeChild.id}/dateTime/${d.year()}/${d.month() + 1}/${d.date()}`);
};
const refChildren = () => firebase.database().ref("children");

const firebaseConfig = {
  apiKey: "AIzaSyBD6va-HdjI5SpIRuyzgUOfVQwWfnHz6Lg",
  authDomain: "babydiary-42798.firebaseapp.com",
  databaseURL: "https://babydiary-42798-default-rtdb.firebaseio.com",
  projectId: "babydiary-42798",
  storageBucket: "babydiary-42798.appspot.com",
  messagingSenderId: "986692259460",
  appId: "1:986692259460:web:b86d594802f28f3c77fcd1",
  measurementId: "G-FJ64V83SNY",
};

const _isDayOrNight = async (time) => {
  const date = convertDateFromTime(time);
  const startTime = JSON.parse(await AsyncStorage.getItem(`@startNightSleep`));
  const endTime = JSON.parse(await AsyncStorage.getItem(`@endNightSleep`));
  const startHours = parseInt(startTime.split(":")[0]);
  const endHours = parseInt(endTime.split(":")[0]);
  const hours = date.getHours();

  return hours > endHours && hours < startHours ? "day" : "night";
};

const _calcWakefulness = async (
  date,
  getOnce,
  endTime,
  endDate,
  previousDreams
) => {
  const activeLanguages = await AsyncStorage.getItem("@active_language");
  const endTimeCurrent = moment.isMoment(endTime)
    ? endTime.format("HH:mm")
    : endTime;
  const { dreams } = await getOnce(date);
  const sortedDreams = dreams.sort((a, b) =>
    a.startTime > b.startTime ? -1 : 1
  );

  const endTimeCalc =
    sortedDreams[1] && sortedDreams[1].endTime
      ? sortedDreams[1].endTime
      : endTimeCurrent
      ? endTimeCurrent
      : moment().local().format("HH:mm");
  const startTimeCalc =
    sortedDreams[0] && sortedDreams[0].startTime
      ? sortedDreams[0].startTime
      : moment().local().format("HH:mm");
  const start = convertDateFromTime(startTimeCalc);
  const end = convertDateFromTime(endTimeCalc);
  console.log(start, "sss", end);
  return {
    value: formatDistanceStrict(start, end, {
      locale: activeLanguages === "en" ? ru : ru,
    }),
    inMinutes: differenceInMinutes(start, end),
  };
};

class Fire {
  constructor() {
    this._init();
  }
  _init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  setStartTime = async (date, payload) => {
    try {
      await (await ref(date)).child(payload.id).set(payload);
      // return await this.getOnce(date);
    } catch (error) {
      console.log(error);
    }
  };

  setEndTime = async (
    { date, id, started },
    endTime,
    endDate,
    previousDreams = [],
    isUpdateYday
  ) => {
    try {
      const entT =
        typeof endTime !== "string" ? moment(endTime).format("HH:mm") : endTime;
      //let activeChild = JSON.parse(await AsyncStorage.getItem('@active_child'));
      const result = {
        endTime: entT,
        endDate: endDate,
        wakefulness: await _calcWakefulness(
          date,
          this.getOnce,
          endTime,
          endDate,
          previousDreams
        ),
        started,
      };
      console.log(result, "🎁🎗🎁🎗🎁");
      await (await ref(date)).child(id).update(result);

      // return await this.getOnce(isUpdateYday ? endDate : date, previousDreams);
    } catch (error) {
      console.log(error);
    }
  };

  setBackupDream = async ({ date, id, dream, previousDreams = [] }) => {
    try {
      let activeChild = JSON.parse(await AsyncStorage.getItem("@active_child"));
      await (await ref(date)).child(id).set(dream);
      return await this.getOnce(date, previousDreams);
    } catch (error) {
      console.log(error);
    }
  };

  getOnce = async (date) => {
    console.log("CALLING API", date);

    try {
      const now = Date.now();
      const dreamsRef = await ref(date);
      console.log("got ref", Date.now() - now);
      const snapshot = await dreamsRef.once("value");
      console.log("got snapshot", Date.now() - now);
      if (snapshot.hasChildren()) {
        return { dreams: Object.values(snapshot.val()).reverse() };
      }
      // return { dreams: [...allDreams, ...dreams] };
      return { dreams: [] };
    } catch (error) {
      console.log(error);
      return { dreams: [] };
    }
  };

  delete = async (
    date,
    { startDate, endDate, id, timeOfDay },
    previousDreams = []
  ) => {
    try {
      if (!moment(startDate).isSame(moment(endDate))) {
        // timeOfDay === 'night' &&
        await (await ref(moment(startDate))).child(id).remove();
      } else {
        await (await ref(date)).child(id).remove();
      }
      return await this.getOnce(date, previousDreams);
    } catch (error) {
      console.log(error);
    }
  };

  getChildren = async () => {
    try {
      const snapshot = await refChildren().once("value");

      if (snapshot.hasChildren()) {
        return { children: Object.values(snapshot.val()).reverse() };
      }

      return { children: [] };
    } catch (error) {
      console.log(error);
      return { children: [] };
    }
  };

  createEvent = async (childId, payload) => {
    const creationDate = moment(payload.startTime).locale("en").format("L");
    try {
      return await firebase
        .database()
        .ref(childId)
        .child("events")
        .child(creationDate)
        .child(payload.id)
        .set(payload);
    } catch (error) {
      console.log(error);
    }
  };
  getEventsByDate = async (childId, date) => {
    const snapshot = await firebase
      .database()
      .ref(childId)
      .child("events")
      .child(date)
      .once("value");
    if (snapshot.hasChildren()) {
      return Object.values(snapshot.val());
    }
    return [];
  };
  updateEvent = async (childId, previousDate, payload) => {
    const baseRef = firebase.database().ref(childId).child("events");
    const inputDate = moment(payload.startTime).locale("en").format("L");
    if (inputDate !== previousDate) {
      await baseRef.child(previousDate).child(payload.id).remove();
    }
    await baseRef.child(inputDate).child(payload.id).set(payload);
  };

  deleteEvent = async (childId, payload) => {
    const eventDate = moment(payload.startTime).locale("en").format("L");
    await firebase
      .database()
      .ref(childId)
      .child("events")
      .child(eventDate)
      .child(payload.id)
      .remove();
  };

  createChild = async (payload) => {
    await refChildren().child(`/${payload.id}`).set(payload);

    return await this.getChildren();
  };

  update = async (date, dream, id, prevDate) => {
    const updateRef = (await ref(date)).child(`/${id}`);

    if (!moment(date).isSame(moment(prevDate.startDate), "day")) {
      // deleting record when updated to different date
      console.log("removing");
      const date = moment(prevDate.startDate);
      const removeRef = (await ref(date)).child(`/${id}`);
      await removeRef.remove();
    }
    await updateRef.set({
      ...dream,
      timeOfDay: !dream.timeOfDay
        ? await _isDayOrNight(dream.startTime)
        : dream.timeOfDay,
    });
  };
}

export default new Fire();
