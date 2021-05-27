import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Rating, Image, colors, Icon } from 'react-native-elements';
import api from '../services/api.service';
import MapComponent from '../components/map-component/mapComponent'

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

const DetailScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitud, setLongitud] = useState(0)
  const [latitud, setLatitud] = useState(0)

  const getDetailHotel = async () => {
    try {
      const response = await api.get(`/${navigation.getParam('hotelId')}`);
      setHotelInfo(response?.data);
      setLoading(false);
    } catch (response) {
      setErrorMsg({errorMessage: response.data.error});
      setLoading(false);
    }
  };
  
  const ubication = () => {
      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(function(objPosition)
        {
          setLongitud(objPosition.coords.longitude);
          setLatitud(objPosition.coords.latitude);
    
        }, function(objPositionError)
        {
          switch (objPositionError.code)
          {
            case objPositionError.PERMISSION_DENIED:
              console.log("No se ha permitido el acceso a la posición del usuario.");
            break;
            case objPositionError.POSITION_UNAVAILABLE:
              console.log("No se ha podido acceder a la información de su posición.");
            break;
            case objPositionError.TIMEOUT:
              console.log("El servicio ha tardado demasiado tiempo en responder.")
            break;
            default:
              console.log("Error desconocido.")
          }
        }, {
          maximumAge: 75000,
          timeout: 15000
        });
      }
      else
      {
        console.log("Su navegador no soporta la API de geolocalización.");
      }
    };

  useEffect(() => {
    getDetailHotel();
    ubication();
  }, [])

  return (
    <div>
      {loading ? (
        <View style={styles.row}>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Card>
            <Text style={styles.name} h1>
              {hotelInfo.name}
            </Text>
            <Rating
              imageSize={18}
              startingValue={hotelInfo.stars}
              style={styles.stars}
            />
            <View style={styles.locationContainer}>
              <Icon
                name='md-pin'
                type='ionicon'
              />
              <Text style={styles.locationDescription} h1>
                {hotelInfo.location}
              </Text>
            </View>
            <MapComponent geolocationLat={latitud} geolocationLon={longitud} zoom={15}/>
          </Card>
          
      </View>
      )}
    </div>
  )
}

export default DetailScreen
