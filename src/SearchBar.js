import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import debounce from 'lodash/debounce';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };
    this.changePromise = {};
  }

  _handleChange() {
    this.changePromise.cancel && this.changePromise.cancel();
    this.changePromise = debounce(
      () => this.props.onChange(this.state.term),
      500,
    );
    this.changePromise();
  }

  render() {
    const { ...s } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          value={s.term}
          onChangeText={term =>
            this.setState({ term }, () => this._handleChange())
          }
          style={styles.input}
          placeholder="Search by username.."
          placeholderTextColor="#666"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3c4146',
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  input: {
    height: 50,
    color: 'white',
    backgroundColor: '#202326',
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 16,
  },
});
