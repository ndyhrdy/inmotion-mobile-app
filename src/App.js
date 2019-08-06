/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Header from './Header';
import SearchBar from './SearchBar';
import Users from './Users';

class App extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#3c4146" />
        <SafeAreaView style={styles.container}>
          <Header />
          <SearchBar onChange={term => this.users.load(term)} />
          <Users ref={r => (this.users = r)} />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ebebeb' },
});

export default App;
