import { View, Text } from 'react-native'
import React from 'react'

export default function AllShopsScreenComponent() {
  return (
    <View style={{
                 flex:1,
                   justifyContent:"center",
                  alignItems:"center",
                  backgroundColor: "#48d969",
              }}>
                  <Text style={{fontSize: 20, color: "#ffffff", fontWeight: "800"}}>ShopsScreen is here!</Text>
               </View>
  )
}
// function ShopScreenComponent(){
//     return(
//         <View style={{
//             flex:1,
//             justifyContent:"center",
//             alignItems:"center",
//             backgroundColor: "#48d969",
//         }}>
//             <Text style={{fontSize: 20, color: "#ffffff", fontWeight: "800"}}>ShopScreen is here!</Text>
//         </View>
//     );
// }