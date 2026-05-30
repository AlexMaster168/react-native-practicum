import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  columnsContainer: {
    flex: 1,

    paddingVertical: 5,
    paddingHorizontal: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    height: 600,
    width: 40,
    marginHorizontal: 5,
    backgroundColor: '#000000',

    position: 'relative',
  },
  dreamDiagram: {
    position: 'absolute',
    marginVertical: 10,
    width: 40,
    backgroundColor: '#000000',
  },
  ratioColumnsContainer: {
    flexDirection: 'column-reverse',
    // justifyContent: 'space-around',
  },
  ratioDreamDiagram: {
    position: 'absolute',
    marginVertical: 10,
    width: 40,
    backgroundColor: '#000000',
  },
});
