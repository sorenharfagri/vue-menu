"use strict";
exports.__esModule = true;
var Component_1 = require("./Component");
var ContainerComponent_1 = require("./ContainerComponent");
var MenuController = /** @class */ (function () {
    function MenuController() {
    }
    MenuController.createContainer = function (name, to) {
        //Проверяем, если контейнер уже существует
        if (MenuController.containers.get(name))
            return;
        //Проверяем, существует ли контейнер, к которому мы хотим добавить ещё один контейнер
        var existContainer = MenuController.containers.get(to);
        //Создаём контейнер
        var newContainer = new ContainerComponent_1["default"](name);
        //Проверяем, есть ли компоненты, ожидающие создания сего контейнера
        var waitPoolComponent = MenuController.waitPool.get(name);
        if (existContainer) {
            if (waitPoolComponent) {
                //Если таковые есть, добавляем их в ныне созданный контейнер
                waitPoolComponent.forEach(function (component) {
                    if (component instanceof ContainerComponent_1["default"]) {
                        MenuController.containers.set(component.componentName, component);
                    }
                    else {
                        MenuController.components.set(component.componentName, component);
                    }
                    newContainer.addComponent(component);
                });
                MenuController.waitPool["delete"](name);
            }
            //Присоединяем контейнер к другому контейнеру
            existContainer.addComponent(newContainer);
            //Добавляем новый контейнер в пул
            MenuController.containers.set(name, newContainer);
            MenuController.updateView();
        }
        else {
            //Если пул уже создан - добавляем в него ожидающий контейнер
            if (waitPoolComponent) {
                waitPoolComponent.push(newContainer);
            }
            else {
                //В ином случае создаём пул
                MenuController.waitPool.set(to, [newContainer]);
            }
        }
    };
    MenuController.createComponent = function (props) {
        //Проверяем, если компонент уже существует
        if (MenuController.components.get(props.name))
            return;
        //Создаём новый компонент
        var newComponent = new Component_1["default"](props.name, props.event);
        props.isEnabled != undefined ? newComponent.isEnabled = props.isEnabled : true;
        //Проверяем, существует ли контейнер, к которому мы хотим добавить компонент
        var existContainer = MenuController.containers.get(props.to);
        if (existContainer) {
            existContainer.addComponent(newComponent);
            MenuController.components.set(props.name, newComponent);
            if (MenuController.sockets) {
                var menu = MenuController.containers.get('MainMenu');
                MenuController.sockets.emit('getMenu', menu);
                console.log('Sent new menu');
            }
            return;
        }
        //В ином случае, переносим компонент в ожидание
        var waitPoolComponent = MenuController.waitPool.get(props.to);
        if (waitPoolComponent) {
            waitPoolComponent.push(newComponent);
        }
        else {
            //В ином случае создаём пул
            MenuController.waitPool.set(props.to, [newComponent]);
        }
    };
    MenuController.enableComponent = function (componentName) {
        var component = MenuController.components.get(componentName);
        if (component && !component.isEnabled) {
            component.isEnabled = true;
            MenuController.updateView();
        }
    };
    MenuController.disableComponent = function (componentName) {
        var component = MenuController.components.get(componentName);
        if (component && component.isEnabled) {
            component.isEnabled = false;
            MenuController.updateView();
        }
    };
    MenuController.updateView = function () {
        if (MenuController.sockets) {
            var menu = MenuController.containers.get('MainMenu');
            MenuController.sockets.emit('updateMenu', menu);
            console.log('Sent new menu');
        }
    };
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
    MenuController.provideSockets = function (sockets) {
        console.log("Socks provided to the menu");
        this.sockets = sockets;
    };
    MenuController.containers = new Map();
    MenuController.components = new Map();
    MenuController.waitPool = new Map();
    return MenuController;
}());
MenuController.containers.set('MainMenu', new ContainerComponent_1["default"]('MainMenu'));
exports["default"] = MenuController;
