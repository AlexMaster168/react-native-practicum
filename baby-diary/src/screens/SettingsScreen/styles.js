import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    settingsContainer: {
        backgroundColor: "#F3F2F8",
        height: '100%'
    },
    settingsSectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#b09cb5',
        marginLeft: 15
    },
    childrenBlock: {
        marginVertical: 15
    },
    settingsLink: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 ,
        borderBottomColor:'#b09cb5'
    },
    iconContainer: {
        padding: 5 ,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 50
    },
    settingsLinkIcon: {
        width: 24,
        height: 24,
      
        
    },
    addBlock: {
        //paddingHorizontal: 0,
        backgroundColor: '#fff',
        //padding: 20,
        borderRadius: 10,
        margin: 10
        
    }
})