import AsyncStorage from '@react-native-async-storage/async-storage';
import { _recommendationList } from '../../screens/RecommendationsScreen';
import { setIsLaunched } from './appReducer';

const SET_CHILDREN = 'child/SET_CHILDREN';
const SET_LOADING = 'child/SET_LOADING';
const SET_ACTIVE_CHILD = 'child/SET_ACTIVE_CHILD';
const SET_RECOMMENDATION_SLEEP_TIME = 'child/SET_RECOMMENDATION_SLEEP_TIME';

const initialState = {
  children: [],
  activeChild: '',
  loading: false,
  recommendation: '',
};

export const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHILDREN: {
      return {
        ...state,
        children: action.children,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case SET_ACTIVE_CHILD: {
      return {
        ...state,
        activeChild: action.child,
      };
    }
    case SET_RECOMMENDATION_SLEEP_TIME: {
      return { ...state, recommendation: action.currentRecommendation };
    }
    default:
      return state;
  }
};

export const setChildren = (children) => ({ type: SET_CHILDREN, children });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setActiveChild = (child) => ({ type: SET_ACTIVE_CHILD, child });
export const setRecommendationSleepTime = (currentRecommendation) => ({
  type: SET_RECOMMENDATION_SLEEP_TIME,
  currentRecommendation,
});

export const initChildren = () => async (dispatch) => {
  // await AsyncStorage.removeItem('@children') // await AsyncStorage.removeItem('@appLaunched_key')  // await AsyncStorage.clear()
  // try {
  //     const activeChild  = await AsyncStorage.getItem('@active_child')
  //     return activeChild  != null ? JSON.parse(activeChild ) : null
  //     } catch(e) {
  //         console.warn('null')
  // }
  const activeChild = await AsyncStorage.getItem('@active_child');
  console.log(activeChild, 'active child 👶');
  // activeChild != null ? JSON.parse(activeChild) : null;
  dispatch(setLoading(true));
  AsyncStorage.getItem('@children').then((children) => {
    const storageChildren = JSON.parse(children);
    dispatch(setChildren(storageChildren));
    dispatch(
      changeChild(
        JSON.parse(activeChild) ||
          (storageChildren?.length ? storageChildren[0] : null)
      )
    );
  });
  dispatch(setLoading(false));
};

export const createChildren = (payload) => async (dispatch) => {
  const child = {
    ...payload,
    id: `${+new Date()}`,
  };
  const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'));

  if (!storageChildren) {
    await AsyncStorage.setItem('@children', JSON.stringify([child]));
    dispatch(setChildren([child]));
    dispatch(changeChild(child));
    await AsyncStorage.setItem('@appLaunched_key', 'true');
    dispatch(setIsLaunched(true));
    // * dispatch(changeChild(jsonChildren[0])); if it's first child created
  } else {
    const jsonChildren =
      storageChildren &&
      storageChildren?.length &&
      storageChildren.concat(child);
    await AsyncStorage.setItem('@children', JSON.stringify(jsonChildren));

    dispatch(setChildren(jsonChildren));
  }
  // console.log('storageChildren',storageChildren)
};

export const deleteChild = (id, activeChild) => async (dispatch) => {
  console.log('active child', activeChild, 'id', id);
  const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'));
  const updatedChildren = storageChildren.filter(
    (child) => child.id.toString() !== id.toString()
  );
  await AsyncStorage.setItem('@children', JSON.stringify(updatedChildren));
  dispatch(setChildren(updatedChildren));
  if (activeChild.id === id) {
    dispatch(changeChild());
  }
};

export const changeChild = (child) => async (dispatch) => {
  const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'));
  if (storageChildren) {
    let activeChild;
    console.log('reducer child', child);
    if (child) {
      activeChild =
        storageChildren.find((c) => c.id === child.id) ||
        (storageChildren?.length ? storageChildren[0] : null);
    } else {
      activeChild = storageChildren?.length ? storageChildren[0] : null;
    }
    await AsyncStorage.setItem('@active_child', JSON.stringify(activeChild));
    dispatch(setActiveChild(activeChild));
  }
};

export const editChild = (payload, activeChild) => async (dispatch) => {
  const storageChildren = JSON.parse(await AsyncStorage.getItem('@children'));
  const editedChildren = storageChildren.map((child) => {
    if (child.id === payload.id) {
      child.name = payload.name;
      child.date = payload.date;
      child.gender = payload.gender;
    }
    return child;
  });
  await AsyncStorage.setItem('@children', JSON.stringify(editedChildren));
  dispatch(setChildren(editedChildren));
  if (activeChild.id === payload.id) {
    // if current child getting updated
    dispatch(
      setActiveChild(
        editedChildren.find((child) => child.id === activeChild.id)
      )
    );
  }
};

export const getCurrentRecommendation = (activeChild) => async (dispatch) => {
  let recommendationList = _recommendationList;
  let birthday = new Date(activeChild.date);
  let nowDate = new Date();
  let diff = new Date(nowDate.getTime() - birthday.getTime());

  dispatch(setRecommendationSleepTime(recommendationList[diff.getUTCMonth()]));
};
