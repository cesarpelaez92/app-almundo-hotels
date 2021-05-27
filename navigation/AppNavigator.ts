import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailScreen';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: { title: 'Lista de hoteles'},
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.name}`,
              }),
        }
    }, 
    {
        initialRouteName: "Home"
    }
);

export default AppNavigator;
