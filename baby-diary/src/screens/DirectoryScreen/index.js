import React, {useState} from "react";
import {View, ActivityIndicator} from 'react-native'
import {DirectoryInfo, CenterBlock} from "../../components";
import {styles} from './styles'
import {main} from '../../core/colors'
import {renderCreateButton} from "../../utils/renderDirectoryButton";
import AdBanner from "../../components/AdBanner";

const DirectoryScreen = ({info, type, languages, loading, theme}) => {
    const [visible, setVisible] = useState(false)
    const _handleOpenModal = () => {
        setVisible(!visible)
    }

    return (
        <React.Fragment>
            <View style={{...styles.directoryContainer, backgroundColor: theme.background}}>
                <View style={{marginBottom: 15, marginLeft: 15}}>{
                    <View style={styles.topLine}>
                        {renderCreateButton(languages.add, type, _handleOpenModal, visible, setVisible, {marginHorizontal: 20})}
                    </View>
                    }
                </View>
                {
                    !loading
                        ? (info) && (
                        <View style={{backgroundColor: '#fff'}}>
                            {
                                info.map((item, index) => <DirectoryInfo
                                    key={index}
                                    type={type}
                                    id={item.id}
                                    value={item.value}
                                    theme={theme}
                                />)
                            }
                        </View>
                    ): <CenterBlock><ActivityIndicator size="large" color={main}/></CenterBlock>
                }
            </View>
            <AdBanner/>
        </React.Fragment>
        )
}

export default DirectoryScreen