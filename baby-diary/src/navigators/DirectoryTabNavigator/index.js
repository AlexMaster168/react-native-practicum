import React from 'react'
import {DirectoryScreen} from "../../screens";
import {useTopTabNavigator} from "../../hooks/useTopTabNavigator";
import {useSelector} from "react-redux";

const screens = languages => [
    {
        name: 'Places',
        component: props => <DirectoryScreen {...props} type='places'/>,
        options: {title: `${languages.sleeping_places}`}
    },
    {
        name: 'Tags',
        component: props => <DirectoryScreen {...props} type='tags'/>,
        options: {title: `${languages.tags}`}
    },
]

const DirectoryTabNavigator = () => {
    const languages = useSelector( ({app}) => app.languages)
    const navigator = useTopTabNavigator(screens(languages))
    return navigator
}

export default DirectoryTabNavigator