import React from 'react';
import { View } from 'react-native';
import { CenterBlock, CreateChildForm } from '../../components';
import { styles } from './styles';
import AdBanner from '../../components/AdBanner';

const AddChild = ({ goToBack, languages, child, theme }) => {
  return (
    <React.Fragment>
      <CenterBlock style={styles.centerBlock}>
        <View style={styles.createChildFormContainer}>
          <CreateChildForm goToBack={goToBack} child={child} />
        </View>
      </CenterBlock>
      <AdBanner />
    </React.Fragment>
  );
};

export default AddChild;
