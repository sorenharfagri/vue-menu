class Component {
    rpcEvent: string
    componentName: string
    isEnabled: boolean = true

    constructor(name: string, rpcEvent: string) {
        this.componentName = name
        this.rpcEvent = rpcEvent
    }
}

export default Component