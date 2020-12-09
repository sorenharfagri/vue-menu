"use strict";
exports.__esModule = true;
var MenuContoller_1 = require("../Menu/MenuContoller");
MenuContoller_1["default"].createComponent({
    name: 'Set Vsync',
    event: 'setVsync',
    to: 'Settings'
});
MenuContoller_1["default"].createComponent({
    name: 'Change Resolution',
    event: 'setRes',
    to: 'Settings'
});
MenuContoller_1["default"].createComponent({
    name: 'Hat shop',
    event: 'openHatShop',
    to: 'Donate',
    isEnabled: false
});
MenuContoller_1["default"].createComponent({
    name: 'Vehicle Shop',
    event: 'openVehicleShop',
    to: 'Donate'
});
MenuContoller_1["default"].createContainer('Settings', 'MainMenu');
MenuContoller_1["default"].createContainer('Donate', 'MainMenu');
module.exports = function (io) {
    var menu = MenuContoller_1["default"].containers.get('MainMenu');
    MenuContoller_1["default"].provideSockets(io);
    //Активация элемента
    // setTimeout(() => {
    //     console.log('Enable Hat Shop')
    //     MenuController.enableComponent('Hat shop')
    // }, 10000)
    //Добавление нового элемента
    // setTimeout(() => {
    //     console.log('Added gun shop')
    //     MenuController.createContainer('Gun shop', 'Donate')
    // }, 15000)
    // setTimeout(() => {
    //     console.log('Try to add M4A2 to the gun shop')
    //     MenuController.createComponent({
    //         name:'M4A2',
    //         to: 'Gun shop',
    //         event: 'buyM4A2',
    //     })
    // }, 5000)
    io.on('connection', function (socket) {
        console.log("Client connected");
        socket.on('getMenu', function () {
            // console.dir(MenuController.containers.get('Settings'))
            socket.emit('getMenu', menu);
        });
    });
};
