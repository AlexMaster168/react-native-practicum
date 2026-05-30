import React, {useState} from 'react'
import {View, TextInput, Text, Dimensions} from "react-native";
import {styles} from './styles'
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Button} from "../../components";
import AdBanner from "../../components/AdBanner";

const deviceWidth = Dimensions.get('window').width
const DreamComment = ({dream, date}) => {
    const languages = useSelector( ({app}) => app.languages);
    const theme = useSelector( ({app}) => app.activeTheme);

    const [comment, setComment] = useState(dream ? dream.comment : '')
    const [updatedDream, setUpdatedDream] = useState(dream || {})

    const dispatch = useDispatch();
    const {navigate} = useNavigation();
    const _handleCommentChange = value => setComment(value)

    const _updateDreamComment = () => {
        setUpdatedDream({...updatedDream, comment})
    }

    const _handleButtonSave = () => {
        navigate('Dream', {comment})
        setComment('')
    }

    return(
        <React.Fragment>
            <View style={{...styles.dreamComment, backgroundColor: theme.background}}>
                <Text style={{...styles.textAreaLabel, color: theme.text}}>{languages.comment_label}</Text>
                <TextInput
                    value={comment}
                    onChangeText={_handleCommentChange}
                    onBlur={_updateDreamComment}
                    multiline
                    blurOnSubmit
                    style={{
                        ...styles.textAreaStyle,
                        width: deviceWidth - 40,
                        color: theme.text
                    }}
                />
                <Button buttonText={languages.add} pressHandler={_handleButtonSave}/>
            </View>
            <AdBanner/>
        </React.Fragment>
    )
}

export default DreamComment