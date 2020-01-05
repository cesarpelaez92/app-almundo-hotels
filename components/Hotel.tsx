import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, Button, Rating, colors } from 'react-native-elements';
import { default as NumberFormat } from 'react-number-format';
import { withNavigation } from 'react-navigation';

interface Props {
    navigation: any,
    hotel: any
}

class Product extends Component<Props> {
    render() {
        return (
            <Card image={{ uri: this.props.hotel.images[0] }}>
                <View style={styles.hotelContainer}>
                    <View>
                        <Text h1 style={styles.name}>
                            {this.props.hotel.name}
                        </Text>
                        <Rating
                            imageSize={18}
                            readonly
                            startingValue={this.props.hotel.stars}
                            style={styles.stars}
                        />
                    </View>

                    <View>
                        <Text h4 style={{ fontSize: 14, color: colors.grey3 }}>
                            Precio por noche
                        </Text>
                        <NumberFormat value={this.props.hotel.price}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'ARS '}
                            renderText={(value) =>  <Text style={styles.price}>{value}</Text>}
                        />
                    </View>
                </View>

                <Button
                    type="clear"
                    title='View'
                    onPress={() => this.props.navigation.navigate('Details', {
                        hotelId: this.props.hotel._id,
                        name: this.props.hotel.name
                    })}
                />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    hotelContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    price: {
        color: '#f1c40f',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    stars: {
        marginTop: 8,
        alignItems: "flex-start",

    }
});

export default withNavigation(Product);