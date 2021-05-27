import React, { useEffect, useState} from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import Hotel from '../components/Hotel';
import api from '../services/api.service';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  }
});

const HomeSscreen = (props) => {

  const [loading, setLoading] = useState(false);
  const [hotelsInfo, setHotelsInfo] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('')
  const [filteredHotels, setFilteredHotels] = useState<any>([]);

  const getHotels = async () => {
    try {
      setLoading(true)
      const response = await api.get('/');
      setHotelsInfo(response?.data);
      setLoading(false);
      setFilteredHotels(response?.data);
    } catch (response) {
      setErrorMsg(response.problem);
      setLoading(false);
    }
  }

  const filterHotels = (query) => {
    const result = hotelsInfo.filter( hotel => hotel.name.toUpperCase().includes(query.toUpperCase()))
    setSearch(query);
    setFilteredHotels(result);
  }

  useEffect(() => {
    getHotels();
  }, [])

  return (
    <>
      {loading ? (
          <View style={styles.row}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView style={{flexGrow: 0, width: "100%", height: "100%" }}>
              <SearchBar
                  placeholder=""
                  lightTheme
                  onChangeText={filterHotels}
                  value={ search }
              />
              {!!errorMsg && <Text>{ errorMsg }</Text>}
              {
                filteredHotels.map((hotel, index) => {
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
        ) 
      }
    </>  
  )
}

export default withNavigation(HomeSscreen)
