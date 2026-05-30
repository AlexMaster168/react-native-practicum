import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getInfo} from "../../../redux/reducers/directoryReducer";
import {setLanguagesTC} from "../../../redux/reducers/appReducer";
import {useNavigation, useRoute} from "@react-navigation/native";
import AddTags from "../index";

const mapStateToProps = (({directory, app}) => ({
    tags: directory.tags,
    languages: app.languages,
    theme: app.activeTheme
}))

export default connect(mapStateToProps, {
    getInfo,
    setLanguagesTC,
})(({getInfo, tags, setLanguagesTC, languages, theme}) => {
    const navigation = useNavigation()
    const {params} = useRoute()
    const {activeTags, setTags} = params

    useEffect(() => {
        setLanguagesTC()
    }, [languages])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getInfo('tags')
        });
        return unsubscribe
    }, [navigation])

    return (
        <AddTags navigation={navigation} activeTags={activeTags} setTags={setTags} languages={languages} tags={tags} theme={theme}/>
    )
})