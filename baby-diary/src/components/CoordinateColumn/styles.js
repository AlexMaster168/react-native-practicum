import { StyleSheet } from 'react-native';
import { main, accent } from '../../core/colors';

export const styles = StyleSheet.create({
  column: {
    overflow: 'visible',
    zIndex: 0,
    position: 'relative',
  },

  dreamDiagram: {
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 2,
    opacity: 1,
    marginVertical: 0,
    borderRadius: 5,
    width: '100%',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    padding: 15,
  },
  modalDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSleepTime: {
    marginVertical: 10,
  },
  placeContainer: { backgroundColor: 'red' },
  hourCell: {
    height: 0.5,
    marginHorizontal: 3,
    position: 'absolute',
    marginLeft: 0,
    marginTop: 20,
  },
  ratioColumn: {
    height: 20,
    overflow: 'visible',
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    left: 45,
    color: main,
  },
  ratioDreamDiagram: {
    position: 'absolute',
    marginVertical: 0,
    height: 20,
    borderRadius: 3,
    overflow: 'hidden',
  },
});
