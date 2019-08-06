import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './Users';

export default function UserItem(props) {
  return (
    <View style={styles.item}>
      {props.avatar_url.length > 0 && (
        <Image
          source={{ uri: props.avatar_url }}
          style={styles.itemPhoto}
          borderRadius={20}
        />
      )}
      <Text style={styles.itemUsername}>{props.login}</Text>
    </View>
  );
}
