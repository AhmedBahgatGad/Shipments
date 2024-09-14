import { IProduct } from "./iproduct";

enum Ordertype {
    branch = 'branch',
    company = 'company',
    specificPlace = 'specific_place'
}
enum DeliveryType {
    regular = 'regular',
    in24h = 'in24h',
    in15d = 'in15d'
}
enum Payment {
    cash = 'cash',
    visa = 'visa',
    package = 'package'
}
export interface IOrder {
    orderType:Ordertype,
    clientName:string,
    phone:number,
    phone2:number,
    email:string,
    governrate:string,
    city:string,
    village:string,
    toVillage:boolean,
    deliveryType:DeliveryType,
    payment:Payment,
    branch:string,
    products:IProduct[],
    orderCost:number,
    totalWeight:number,
    merchantPhone:number,
    merchantAddress:string,
}
