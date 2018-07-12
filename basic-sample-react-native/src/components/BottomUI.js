import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, Text as NativeText } from 'react-native';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { images } from 'static-assets';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 50,
    backgroundColor: 'blue'
  },
});

const BottomUI = ({ fields, copyright }) => {
  if (fields.hideComponent.value === 'true') {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text field={fields.title} />
    </View>
  )
};

BottomUI.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.object,
  }),
};

export default BottomUI;
