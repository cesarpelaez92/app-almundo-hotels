import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import Hotel from '../components/Hotel';
import api from '../services/api.service';

interface Props {
  navigation: any
}

interface MyState {
  loading: any,
  hotels: any,
  errorMessage: any
}

class HomeScreen extends Component<Props, MyState> {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hotels: [],
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.getHotels();
  }

  getHotels = async () => {
    try {
      this.setState({ loading: true });
      const response = await api.get('/');

      this.setState({
        hotels: response.data,
        loading: false,
      });

    } catch (response) {
      this.setState({ errorMessage: response.problem, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.row}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView
        style={{
          flexGrow: 0,
          width: "100%",
          height: "100%",
        }}>
        {!!this.state.errorMessage && <Text>{ this.state.errorMessage }</Text>}
        {
          this.state.hotels.map((hotel, index) => {
            return (
              <View style={styles.row} key={index}>
                <View style={styles.col}>
                  { <Hotel hotel={hotel} /> }
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  },
});

export default withNavigation(HomeScreen);