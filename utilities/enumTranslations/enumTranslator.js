const enumerations = require('../../resources/enumerations')

export const translateOrderStatus = (orderStatus) => {
    switch (orderStatus) {
        case enumerations.order.orderStatus.registered: return 'registered'
        case enumerations.order.orderStatus.preparing: return 'preparing'
        case enumerations.order.orderStatus.ready: return 'ready'
        default:
            break;
    }
}