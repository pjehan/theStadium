import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const NETWORK_INTERFACE_URL = 'https://http://192.168.1.95:8001';
const SUBSCRIPTION_CLIENT_URL = 'wss://subscriptions.graph.cool/v1/API_KEY';

const networkInterface = createNetworkInterface({ uri: NETWORK_INTERFACE_URL });
const wsClient = new SubscriptionClient(SUBSCRIPTION_CLIENT_URL, {
    reconnect: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
});


export default client;