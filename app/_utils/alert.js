import {Alert} from "react-native";

const _errorAlert = (msg) => {
    Alert.alert(
        'Une erreure est survenue',
        msg,
        [
            {text: 'OK'},
        ],
        {cancelable: false}
    )
};

export {
    _errorAlert
}