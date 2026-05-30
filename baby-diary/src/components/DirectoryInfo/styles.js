import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderColor: '#E8E8E8',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    infoItemIcons:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoIcon: {
        width: 28,
        height: 28,
    },
    infoItemText: {
        paddingVertical: 15,
    },
    modalContent: {
        borderRadius: 3,
        backgroundColor: '#fff',
        padding: 15
    },
    modalContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
})