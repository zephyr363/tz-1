export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: string,
    height: number,
    weight: number,
    eyeColor: string,
    hair: UserHair,
    ip: string,
    address:UserAddress,
    macAddress: string,
    university: string,
    bank: UserBank,
    company: UserCompany, 
    ein: string,
    ssn: string,
    userAgent: string, 
}
export type UserHair = {
    type: string,
    color: string
}
export type UserCompany = {
    department: string,
    name: string,
    title: string,
    address: UserAddress
}
export type UserAddress = {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: UserCoords,
    country: string
}

export type UserCoords = {
    lat: number,
    lng: number
}
export type UserBank = {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
}