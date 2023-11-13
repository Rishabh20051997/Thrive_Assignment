import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, ToastAndroid, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import NewsCard from "../../component/news-card/news-card-component"
import { styles } from "./home-screen-style"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useRef, useState } from "react"
import { log } from "../../services/reactotron/reactotron-log"

const RenderListHeader = ({updateDripTimer}: any) => {
    const [textValue, updateTextValue] = useState('10000')
    return <View style={styles.headerContainer}>
        <Pressable style={styles.submitButton} onPress={() => {
            if(Number(textValue)) {
                updateDripTimer(Number(textValue))
            } else {
                ToastAndroid.show('Please enter valid value', ToastAndroid.SHORT)
            }
        }}>
            <Text style={styles.submitText}>Submit</Text>
        </Pressable>
        <View style={styles.textInputContainer}>
            <TextInput
                value={textValue.toString()}
                style={styles.textInput}
                placeholder="Frequency to fetch new data in ms"
                keyboardType="numeric"
                onChangeText={(text) => {
                    updateTextValue(text)
                }} />
        </View>


    </View>
}

const HomeScreenView = ({
    list = [],
    fetchMoreData,
    isLoading,
    dripTimer,
    onPinNewsItem,
    onDelete,
    updateDripTimer
}: IHomeScreenData) => {
   
    const navigation = useNavigation<any>()


    return isLoading ? <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'red'} />
    </View> : <GestureHandlerRootView style={{ flex: 1 }}><FlatList
        data={list}
        renderItem={({ item }) => <NewsCard item={item} navigation={navigation} onPinNewsItem={onPinNewsItem} onDelete={onDelete} />}
        keyExtractor={item => item._id}
        ListHeaderComponent={<RenderListHeader updateDripTimer={updateDripTimer}/>}
        // initialNumToRender={10}
        // windowSize={21}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        onEndReached={fetchMoreData}
        removeClippedSubviews={true}
    />
    </GestureHandlerRootView>
}

export default HomeScreenView