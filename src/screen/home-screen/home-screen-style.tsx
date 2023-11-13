import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: { flexDirection: 'row-reverse', marginHorizontal: 10 },
    textInputContainer: { borderWidth: 0.5 , flex: 1, marginRight: 10},
    textInput: { flex: 1},
    submitButton : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        padding: 10
    },
    submitText: {
        color: '#fff',
        fontWeight: '600'
    }

})