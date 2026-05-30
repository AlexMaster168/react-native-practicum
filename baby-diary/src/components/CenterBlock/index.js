import React from "react";
import {View} from 'react-native'
import {styles} from './styles'
import {useSelector} from "react-redux";
import {accent} from "../../core/colors";

const CenterBlock = ({children, style, res}) => {
    const theme = useSelector( ({app}) => app.activeTheme);
    
    const resStyle = {
        position: 'absolute',
        backgroundColor: accent,
        opacity: 0.7,
        padding: 10,
        borderRadius: 4
    }

    return(
        <View style={{...style, ...styles.centerBlock, backgroundColor: theme.background, ...res && resStyle}}>
            {children}
        </View>
    )
}

export default CenterBlock