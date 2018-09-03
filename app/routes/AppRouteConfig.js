import {createSwitchNavigator,} from 'react-navigation';
import AuthLoadingScreen from "../components/container/AuthenticationLoading";
import AuthStack from "./AuthNavigators";


const AppStackNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
    },
    {
        initialRouteName: "Auth",
        headerMode: "screen"
    }
);

export default AppStackNavigator;