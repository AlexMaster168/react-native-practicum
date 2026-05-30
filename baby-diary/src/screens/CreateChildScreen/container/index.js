import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setChildren } from '../../../redux/reducers/childReducer';
import CreateChild from '../index';

const mapStateToProps = ({ child }) => ({
  children: child.children,
});

export default connect(mapStateToProps, { setChildren })(
  ({ setChildren, setLaunchTC }) => {
    useEffect(() => {
      setChildren();
    }, []);

    return <CreateChild setLaunchTC={setLaunchTC} />;
  }
);
