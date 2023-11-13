import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"

const DetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation()
    const { item}: {item: INewsItem}  = route.params

    useEffect(() => {
        navigation.setOptions({
            headerTitle: item.title || 'Details',
        })
    }, [])
    
    return <View>
       <Text ellipsizeMode="tail" style={styles.titleText}>{item.title}</Text>
       <Text ellipsizeMode="tail" style={styles.contentText}>{item.description}</Text>
    </View>
}

export default DetailScreen

const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      height: 200  
    },
    titleText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '700',
        margin: 10
    },
    contentText : {
        fontSize: 14,
        color: '#333',
        margin: 10
    }
    
})