export type UserType = {
    id?: number,
    name:string,
    phone:string,
    email:string,
    password:string,
}
export type AuthUserType={
    token:string,
    user:UserDetailsType
}
export type UserDetailsType={
    name:string,
    id:number,
    phone:string,
    email:string
}