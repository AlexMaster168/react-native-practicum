import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer as network } from 'react-native-offline';
import { MainReducer } from '../reducers/mainReducer';
import { NewDreamScreenReducer } from '../reducers/timeReducer';
import { statisticsReducer } from '../reducers/statisticsReducer';
import { backupReducer } from '../reducers/backupReducer';
import { appReducer } from '../reducers/appReducer';
import { childReducer } from '../reducers/childReducer';
import { directoryReducer } from '../reducers/directoryReducer';
import { adsReducer } from '../reducers/adsReducer';
import { eventsReducer } from '../reducers/eventsReducer';

const reducers = combineReducers({
  date: MainReducer,
  time: NewDreamScreenReducer,
  statistics: statisticsReducer,
  app: appReducer,
  ads: adsReducer,
  child: childReducer,
  directory: directoryReducer,
  backup: backupReducer,
  events: eventsReducer,
  network,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
