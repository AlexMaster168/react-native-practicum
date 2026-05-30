import { StyleSheet } from 'react-native';
import { accent } from '../../core/colors';
export const styles = StyleSheet.create({
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    color: accent || '#1994B1',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputStyle: {
    paddingHorizontal: 3,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: accent || '#1994B1',
    borderRadius: 3,
    marginBottom: 10,
  },
  buttonPanel: {
    flexDirection: 'row-reverse',
  },

  sectionDirectory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalView: {
    zIndex: 2,
    padding: 5,
    flex: 0.3,
    backgroundColor: '#333',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    backgroundColor: '#F4F0F8',
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: '95%',
    borderRadius: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createInfoButton: {
    marginHorizontal: 8,
  },
});
