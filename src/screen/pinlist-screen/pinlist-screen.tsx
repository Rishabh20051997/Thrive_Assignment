


import usePinListScreenController from "./pinlist-screen-controller"
import PinListScreenView from "./pinlist-screen-view"

const PinListScreen = () => {
    const controllerData = usePinListScreenController()
    return <PinListScreenView {...controllerData}/>
}

export default PinListScreen