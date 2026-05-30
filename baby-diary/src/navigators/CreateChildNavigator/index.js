import React from "react";
import {CreateChild} from "../../screens";
import {useNavigator} from "../../hooks/useNavigator";
import {Text} from "react-native";

const screens = [
    {
        name: 'CreateChild',
        component: CreateChild,
        options: {headerShown: false, headerTitle: () => <Text style={{color: '#fff', fontWeight: 'bold'}}>Новый малыш</Text>}
    }
]

export const CreateChildNavigator = () => {
    const navigator = useNavigator(screens)
    return navigator
}
