import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainCardLayout: {
        flex: 1,
        backgroundColor: '#FCBB1B',
        elevation: 2,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        margin: 6,
        padding: 8,
        borderRadius: 4,
    },
    priceContainer: { flexDirection: 'row', flexShrink: 1, overflow: 'hidden'},
    titleText: {
        fontSize: 16,
        color: '#333',
        paddingVertical:2,
        fontWeight: '700'
    },
    sourceText : {
        fontSize: 14,
        color: '#333',
        fontWeight: '600' 
    },
    backgroundContainer: { zIndex: 0   , position: 'absolute', top: 8, bottom: 8, left: 8, right: 8, flexDirection: 'row'},
    backgroundRightContainer: { flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 10 },
    backgroundLeftContainer: { flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10 },
    pinText: {
        color: '#fff',
        textAlign: 'center'
    },
    deleteText: {
        color: '#fff',
        textAlign: 'center',
        
    }

})