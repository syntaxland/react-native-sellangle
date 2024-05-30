// LoaderButton.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function LoaderButton() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: '10' }}>
      <ActivityIndicator size="small" color="green" />
    </View>
  );
}

export default LoaderButton;
