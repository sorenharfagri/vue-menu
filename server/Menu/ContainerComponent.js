"use strict";
exports.__esModule = true;
var Component_1 = require("./Component");
var ContainerComponent = /** @class */ (function () {
    function ContainerComponent(componentName) {
        this.components = [];
        this.containerComponents = [];
        this.componentName = componentName;
    }
    ContainerComponent.prototype.addComponent = function (component) {
        if (component instanceof Component_1["default"]) {
            this.components.push(component);
        }
        else {
            this.containerComponents.push(component);
        }
    };
    ContainerComponent.prototype.deleteComponent = function (component) {
        if (component instanceof Component_1["default"]) {
            this.components.filter(function (value) {
                if (value != component)
                    return value;
            });
        }
        else {
            this.containerComponents.filter(function (value) {
                if (value != component)
                    return value;
            });
        }
    };
    return ContainerComponent;
}());
exports["default"] = ContainerComponent;
