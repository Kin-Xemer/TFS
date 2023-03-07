const config ={
    screens: {
        HomeScreen: {
            path:"home"
        },
        OrderScreen:{
            path:"order"
        },
        ProfileScreen:{
            path:"profile/:id",
            parse:{
                id: (id)=>{`${id}`}
            }
        }
    }
}
const linking ={prefixes:["tfs://app"]}
export default linking