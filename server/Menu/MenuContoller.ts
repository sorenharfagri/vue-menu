import Component from './Component'
import ContainerComponent from './ContainerComponent'

interface ComponentProps {
    name: string,
    event: string,
    to: string,
    isEnabled?: boolean
}

class MenuController {

    static sockets: SocketIO.Server
    static containers: Map<string, ContainerComponent> = new Map()
    static components: Map<string, Component> = new Map()
    static waitPool: Map<string, [Component | ContainerComponent]> = new Map()

    
    static createContainer(name: string, to: string) {

        //Проверяем, если контейнер уже существует
        if (MenuController.containers.get(name)) return

        //Проверяем, существует ли контейнер, к которому мы хотим добавить ещё один контейнер
        let existContainer = MenuController.containers.get(to)
        //Создаём контейнер
        let newContainer = new ContainerComponent(name)
        //Проверяем, есть ли компоненты, ожидающие создания сего контейнера
        let waitPoolComponent = MenuController.waitPool.get(name)
        if (existContainer) {
            if (waitPoolComponent) {
                //Если таковые есть, добавляем их в ныне созданный контейнер
                waitPoolComponent.forEach(component => {
                    if (component instanceof ContainerComponent) {
                        MenuController.containers.set(component.componentName, component)
                    } else {
                        MenuController.components.set(component.componentName, component)
                    }

                    newContainer.addComponent(component)
                })
                MenuController.waitPool.delete(name)
            }
            //Присоединяем контейнер к другому контейнеру
            existContainer.addComponent(newContainer)
            //Добавляем новый контейнер в пул
            MenuController.containers.set(name, newContainer)

            MenuController.updateView();
        } else {
            //Если пул уже создан - добавляем в него ожидающий контейнер
            if (waitPoolComponent) {
                waitPoolComponent.push(newContainer)
            } else {
                //В ином случае создаём пул
                MenuController.waitPool.set(to, [newContainer])
            }
        }
    }

    static createComponent(props: ComponentProps) {
        //Проверяем, если компонент уже существует
        if (MenuController.components.get(props.name)) return
        //Создаём новый компонент
        let newComponent = new Component(props.name, props.event)
        props.isEnabled != undefined ? newComponent.isEnabled = props.isEnabled : true;

        //Проверяем, существует ли контейнер, к которому мы хотим добавить компонент
        let existContainer = MenuController.containers.get(props.to)
        if (existContainer) {
            existContainer.addComponent(newComponent)
            MenuController.components.set(props.name, newComponent)
            if (MenuController.sockets) {
                let menu = MenuController.containers.get('MainMenu')
                MenuController.sockets.emit('getMenu', menu)
                console.log('Sent new menu')
            }
            return
        }

        //В ином случае, переносим компонент в ожидание
        let waitPoolComponent = MenuController.waitPool.get(props.to)
        if (waitPoolComponent) {
            waitPoolComponent.push(newComponent)
        } else {
            //В ином случае создаём пул
            MenuController.waitPool.set(props.to, [newComponent])
        }

    }

    static enableComponent(componentName: string) {
        let component = MenuController.components.get(componentName)
        if (component && !component.isEnabled) {
            component.isEnabled = true
            MenuController.updateView()
        }
    }

    static disableComponent(componentName: string) {
        let component = MenuController.components.get(componentName)
        if (component && component.isEnabled) {
            component.isEnabled = false
            MenuController.updateView()
        }
    }

    static updateView() {
        if (MenuController.sockets) {
            let menu = MenuController.containers.get('MainMenu')
            MenuController.sockets.emit('updateMenu', menu)
            console.log('Sent new menu')
        }
    }



    // static addToContainer(component: Component, to: string) {
    //     //Проверяем, существует ли контейнер, к которому мы хотим добавить компонент
    //     let existContainer = MenuController.containers.get(to)
    //     if (existContainer) {
    //         existContainer.addComponent(component)
    //         return
    //     }

    //     let waitPool = MenuController.waitPool.get(to)
    //     if (waitPool) {
    //         waitPool.push(component)
    //     } else {
    //         MenuController.waitPool.set(to, [component])
    //     }

    // }

    static provideSockets(sockets: SocketIO.Server) {
        console.log(`Socks provided to the menu`)
        this.sockets = sockets
    }

}

MenuController.containers.set('MainMenu', new ContainerComponent('MainMenu'))

export default MenuController