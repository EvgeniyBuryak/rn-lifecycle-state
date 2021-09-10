import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/homeScreen/home-screen.view';

const navigator = createStackNavigator(
    {
        Home: HomeScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            title: 'List Vacancies'
        }
    }
);

export default createAppContainer(navigator);