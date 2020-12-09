import Component from './Component'

class ContainerComponent {
    public components: Component[] = []
    public containerComponents: ContainerComponent[] = []
    public componentName: string

    constructor(componentName: string) {
        this.componentName = componentName
    }

    public addComponent(component: Component | ContainerComponent) {
        if (component instanceof Component) {
            this.components.push(component)
        } else {
            this.containerComponents.push(component)
        }
    }

    public deleteComponent(component: Component | ContainerComponent) {
        if (component instanceof Component) {
            this.components.filter((value) => {
                if(value != component) return value
            })
        } else {
            this.containerComponents.filter((value) => {
                if(value != component) return value
            })
        }
    }
}

export default ContainerComponent