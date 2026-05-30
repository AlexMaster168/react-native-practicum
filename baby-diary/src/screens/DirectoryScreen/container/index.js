import React, {useEffect} from "react";
import {connect} from 'react-redux'
import DirectoryScreen from "../index";
import {useNavigation} from "@react-navigation/native";
import {getInfo} from '../../../redux/reducers/directoryReducer'
import {setLanguagesTC} from '../../../redux/reducers/appReducer'

const mapStateToProps = (({directory, app})=> ({
    places: directory.places,
    tags: directory.tags,
    loading: directory.loading,
    languages: app.languages,
    theme: app.activeTheme
}))

export default connect(mapStateToProps, {getInfo, setLanguagesTC})( ({type, getInfo, places, tags, setLanguagesTC, languages, loading, theme}) => {
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getInfo(type)
            setLanguagesTC()
        });
        return unsubscribe
    }, [navigation, places, tags, languages])

    return (
        <DirectoryScreen loading={loading} languages={languages} info={type === 'places' ? places : tags} type={type} theme={theme}/>
    )
})
