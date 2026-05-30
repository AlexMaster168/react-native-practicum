import { StyleSheet } from 'react-native';
import { accent } from '../../core/colors';

export const styles = StyleSheet.create({
  childNameText: {
    fontSize: 18,
  },
  childName: {
    margin: 10,
  },
  modalIconClose: {
    width: 30,
    height: 30,
    tintColor: accent,
  },
  headerText: {
    fontSize: 25,
  },
  modalContainer: {
    alignItems: 'center',
  },
  listOfChildrenContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: accent,
    borderWidth: 1,
  },
  changeChildBtn: {
    borderRadius: 50,
    backgroundColor: '#29272b',

    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    height: 30,
    width: 30,
    fontSize: 20,
  },
  changeChildBtnText: {
    textTransform: 'uppercase',
    color: '#fff',
  },
});
