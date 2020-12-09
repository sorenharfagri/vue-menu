import MenuController from "../Menu/MenuContoller";


MenuController.createComponent({
    name: 'Set Vsync',
    event: 'setVsync',
    to: 'Settings',
})

MenuController.createComponent({
    name: 'Change Resolution',
    event: 'setRes',
    to: 'Settings',
})

MenuController.createComponent({
    name: 'Hat shop',
    event: 'openHatShop',
    to: 'Donate',
    isEnabled: false
})

MenuController.createComponent({
    name: 'Vehicle Shop',
    event: 'openVehicleShop',
    to: 'Donate'
})


MenuController.createContainer('Settings', 'MainMenu')
MenuController.createContainer('Donate', 'MainMenu')



module.exports = (io: SocketIO.Server) => {

    let menu = MenuController.containers.get('MainMenu')
    MenuController.provideSockets(io)

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

    io.on('connection', socket => {
        console.log(`Client connected`)

        socket.on('getMenu', () => {
            // console.dir(MenuController.containers.get('Settings'))
            socket.emit('getMenu', menu)
        })

    })

}