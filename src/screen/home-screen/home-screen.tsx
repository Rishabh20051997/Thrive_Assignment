import HomeScreenView from "./home-screen-view"
import useHomeScreenController from "./home-screen-controller"

const HomeScreen = () => {
    const controllerData = useHomeScreenController()
    return <HomeScreenView {...controllerData}/>
}

export default HomeScreen