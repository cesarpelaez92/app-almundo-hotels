import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Rating, Image, colors, Icon } from 'react-native-elements';
import api from '../services/api.service';

interface Props {
  navigation: any
}

interface MyState {
  loading: any,
  hotel: any,
  errorMessage: any
}

class DetailsScreen extends Component<Props, MyState> {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      hotel: null,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getDetailHotel();
    })
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getDetailHotel = async () => {
    try {
      const { navigation } = this.props;
      const response = await api.get(`/${navigation.getParam('hotelId')}`);

      this.setState({
        hotel: response.data,
        loading: false,
      });

    } catch (response) {
      this.setState({ errorMessage: response.data.error, loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.row}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <Card>
          <Text style={styles.name} h1>
            {this.state.hotel.name}
          </Text>
          <Rating
            imageSize={18}
            startingValue={this.state.hotel.stars}
            style={styles.stars}
          />
          <View style={styles.locationContainer}>
            <Icon
              name='md-pin'
              type='ionicon'
            />
            <Text style={styles.locationDescription} h1>
              {this.state.hotel.location}
            </Text>
          </View>
          <Image
            source={{ uri: this.state.hotel.imageLocation }}
            style={styles.location}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  stars: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  locationContainer: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  locationDescription: {
    color: colors.grey3,
    fontSize: 12
  },
  location: {
    width: '100%',
    height: 150
  }
});


export default DetailsScreen;