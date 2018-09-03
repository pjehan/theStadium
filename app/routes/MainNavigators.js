import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {createReactNavigationReduxMiddleware, reduxifyNavigator,} from 'react-navigation-redux-helpers';

import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";
import AppStackNavigator from "./AppRouteConfig";
import AppReducer from "../_reducers/index";


const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.NavigationReducer
);


const AppWithNavigationState = reduxifyNavigator(AppStackNavigator, 'root');
const mapStateToProps = state => {
    return {
        state: state.NavigationReducer,
    };
};

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });
const configureStore = (initialState) => {
    const enhancer = compose(
        applyMiddleware(
            middleware,
            thunkMiddleware,
            loggerMiddleware,
        ),
    );
    return createStore(AppReducer, initialState, enhancer);
};

const Root = () => <AppNavigator />;
export {
    configureStore,
    Root,
};