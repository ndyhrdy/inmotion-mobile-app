import React from 'react';
import { Text, View } from 'react-native';

export default function Header() {
  return (
    <View
      style={{
        paddingHorizontal: 18,
        paddingVertical: 22,
        backgroundColor: '#3c4146'
      }}
    >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        GitHub Users
      </Text>
    </View>
  );
}
