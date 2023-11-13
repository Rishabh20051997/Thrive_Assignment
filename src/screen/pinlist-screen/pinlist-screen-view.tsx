import { ActivityIndicator, FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import NewsCard from "../../component/news-card/news-card-component"

import { useRef } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { styles } from "./pinlist-screen-style"



const PinListScreenView = ({
    list = [],
    isLoading,
    onPinNewsItem,
    onDelete
}: IPinListScreenData) => {
    const textInputRef = useRef<any>()
    const navigation = useNavigation<any>()


    return isLoading ? <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'red'} />
    </View> : <GestureHandlerRootView style={{ flex: 1 }}><FlatList
        data={list}
        renderItem={({ item }) => <NewsCard item={item} navigation={navigation} onPinNewsItem={onPinNewsItem} onDelete={onDelete} />}
        keyExtractor={item => item._id}
        // initialNumToRender={10}
        // windowSize={21}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
    />
    </GestureHandlerRootView>
}

export default PinListScreenView