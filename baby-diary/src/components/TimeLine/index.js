import {Text, View} from "react-native";
import React from "react";
import {styles} from './styles'
//Styles
const _textStyle = ( hourOffset) => {
    return {
        ...styles.textStyle,
        fontSize: 10,
        color: '#ffffff' || '#1768AF',
        margin: 0,
        height: hourOffset,
    }
}

const TimeLine = ({timeLine, hourOffset}) => {
    return(
        <View style={{marginTop: 15}}>{timeLine.map( (time, index) => <Text key={index} style={_textStyle(0.8, index, hourOffset)}>{time}</Text> )}</View>
    )
}

export default TimeLine