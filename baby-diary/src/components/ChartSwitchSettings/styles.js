import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        borderRadius: 6,
        padding: 15,
        backgroundColor: '#19161c'
    },
    currentSetting: {
        marginBottom: 10,
    },
    currentSettingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentText: {
        color: '#ffffff'
    }
})
