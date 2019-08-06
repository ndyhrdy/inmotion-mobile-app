import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import UserItem from './UserItem';

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      fetching: false,
      fetchIndex: 1,
      refreshing: false,

      noMoreResults: false,
      lastTerm: '',
    };
    this.pageLimit = 50;
  }

  componentDidMount() {
    this.load('ndyhrdy');
  }

  load(term = false) {
    if (this.state.fetching || (!term && this.state.noMoreResults)) {
      return this.setState({ refreshing: false });
    }
    return this.setState(
      { fetching: true, users: term ? [] : this.state.users },
      async () => {
        try {
          const params = {
            q: term.length > 0 ? term : this.state.lastTerm,
            page: term || this.state.refreshing ? 1 : this.state.fetchIndex + 1,
            per_page: this.pageLimit,
          };
          const {
            data: { items: users },
          } = await axios.get('https://api.github.com/search/users', {
            params,
          });
          this.setState({
            users: term ? users : [...this.state.users, ...users],
            lastTerm: term || this.state.lastTerm,
            fetchIndex:
              term || this.state.refreshing ? 1 : this.state.fetchIndex + 1,
            noMoreResults: users.length < this.pageLimit,
          });
        } catch (error) {}
        return this.setState({ fetching: false, refreshing: false });
      },
    );
  }

  render() {
    const { ...s } = this.state;

    return (
      <FlatList
        data={s.users}
        renderItem={({ item }) => <UserItem {...item} />}
        contentContainerStyle={styles.scrollContainer}
        keyExtractor={item => `github-user-${item.id}`}
        ListFooterComponent={
          s.fetching &&
          !s.refreshing && (
            <ActivityIndicator
              color="#202326"
              size="large"
              style={styles.activityIndicator}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={s.refreshing}
            onRefresh={() =>
              this.setState({ refreshing: true }, () => this.load())
            }
          />
        }
        onEndReached={() => this.load()}
      />
    );
  }
}

export const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 0.5,
  },
  itemPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  itemUsername: { fontSize: 16, fontWeight: 'bold' },
  scrollContainer: { marginBottom: 24 },
  activityIndicator: { paddingVertical: 24 },
});
