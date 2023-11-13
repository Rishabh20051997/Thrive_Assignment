import { memo } from "react"
import { Pressable, View, Text, Dimensions } from "react-native"
import { styles } from "./news-card-style"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated"

const cardWidth = Dimensions.get('screen').width - 16

const NewsCard = memo(({ item, navigation, onDelete, onPinNewsItem }: 
    { item: INewsItem, navigation: any, onDelete: (item: INewsItem) => void,  onPinNewsItem: (item: INewsItem) => void}) => {

    const maxDistance = cardWidth / 2
    const minDistance = - (cardWidth / 2)



    // current position of pointer

    const position = useSharedValue(0);

    // last position where cursor was dropped
    const lastPosition = useSharedValue(0);

    // flag to determine if pan responder is processing any touch
    const isScrollingPointer = useSharedValue(false);

    // reanimated style object for pointer gesture   
    const pointerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position?.value || 0 }],
    }));

    // gesture handler
    const panGesture = Gesture.Pan()
        .hitSlop({
            vertical: 10,
            horizontal: 10
        }) // increase the size of pointer touch
        .onUpdate((e) => {
            // new value -> previous + new translation
            const updatedValue = (lastPosition?.value + e?.translationX) || lastPosition?.value || 0

            // update value only if its in restricted area
            if (updatedValue <= maxDistance && updatedValue >= minDistance) {
                position.value = updatedValue
            } 
            isScrollingPointer.value = true
        })
        .onEnd((e) => {
            const updatedValue = (lastPosition?.value + e?.translationX) || lastPosition?.value || 0
            // update the last value point
            if(updatedValue >= maxDistance) {
                runOnJS(onPinNewsItem)(item)
            } else if(updatedValue <= minDistance) {
                runOnJS(onDelete)(item)
            }
            position.value = 0
            isScrollingPointer.value = false
        });



    const onProductItemClicked = () => {
        navigation.navigate('Detail', { item: item })
    }


    return <View>
        <View style={styles.backgroundContainer}>
                    <View style={styles.backgroundLeftContainer}><Text style={styles.pinText}>{item?.isPinList ? 'Remove from PinList' : 'PinList'}</Text></View>
                    <View style={styles.backgroundRightContainer}><Text style={styles.deleteText}>Delete</Text></View>
                </View>
                <GestureDetector gesture={panGesture}>
        <Animated.View style={[pointerAnimatedStyle]}>
        
            <Pressable
                onPress={onProductItemClicked}
                style={styles.mainCardLayout}>
                <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                {item.sourceName ? <Text style={styles.sourceText} numberOfLines={1} ellipsizeMode="tail">Source: {item.sourceName}</Text> : null}
                {item.author ? <Text style={styles.sourceText} numberOfLines={1} ellipsizeMode="tail">Author: {item.author}</Text> : null}
            </Pressable>
        </Animated.View>
    </GestureDetector>
    </View> 

})

export default NewsCard