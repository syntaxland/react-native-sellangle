// LoaderPaysofter.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function LoaderPaysofter() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: '10' }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

export default LoaderPaysofter;
