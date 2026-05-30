import {StyleSheet} from 'react-native';
import {accent} from "../../core/colors";

export const styles = StyleSheet.create({
    copyBtn: {
        backgroundColor: accent,
        marginTop: 20,
        borderRadius: 4
    },
    copyBtnText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        color: '#fff',
    },
    hint: {
        fontSize: 13,
        color: '#888888',
        marginTop: 5
    },
    backupContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})