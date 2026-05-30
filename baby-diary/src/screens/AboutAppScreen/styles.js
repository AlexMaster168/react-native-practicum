import {StyleSheet} from 'react-native'
import {main} from "../../core/colors";

export const styles = StyleSheet.create({
    about_container: {
        paddingVertical: 20,
        flex: 1,
    },
    baby_diary: {
        paddingHorizontal: 15,
        fontSize: 21,
        color: main,
        marginBottom: 8
    },
    version: {
        paddingHorizontal: 15,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 20
    },
    about_app_desc: {
        paddingHorizontal: 15,
    },

    buttonsBlock: {
        backgroundColor: '#fff',
        marginTop: 20
    },
    aboutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 1
    },
    aboutButtonIcon: {
        width: 24,
        height: 24,
        marginRight: 10
    }
})