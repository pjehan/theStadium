import { NavigationActions } from 'react-navigation';
/*import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);*/

const screenTracking = ({ getState }) => next => (action) => {
    if (
        action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK
    ) {
        return next(action);
    }

    const currentScreen = getActiveRouteName(getState().navigation);
    const result = next(action);
    const nextScreen = getActiveRouteName(getState().navigation);
    if (nextScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
       // tracker.trackScreenView(nextScreen);
    }
    return result;
};

export default screenTracking;