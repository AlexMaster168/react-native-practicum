import React from "react";
import {Text, View} from "react-native";
import {styles} from "./styles";

const EmptyBlock = ({emptyText, theme}) => {
    return (
        <View>
            <Text style={{...styles.emptyText, color: theme && theme.text}}>{emptyText}</Text>
        </View>
    )
}

export default EmptyBlock