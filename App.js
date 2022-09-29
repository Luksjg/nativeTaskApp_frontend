import React from "react"
import HomeScreen from "./screen/HomeScreen"
import TaskFormScreen from "./screen/TaskFormScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TouchableOpacity, Text, StyleSheet } from "react-native"



const App = ()=>{

  const Stack = createNativeStackNavigator()

  

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen"  
        component={HomeScreen} 
        options={({navigation})=>({
          title:"Aplicacion de tareas",
          headerStyle:{backgroundColor:"#222f3e"}, 
          headerTitleStyle:{color:"#ffffff"},
          headerRight: ()=>(
            <TouchableOpacity onPress={()=> navigation.navigate("TaskFormScreen")}>
              <Text style={styles.newButton}>Nueva tarea</Text>
            </TouchableOpacity>
          )
        })}/>


        <Stack.Screen 
        name="TaskFormScreen" 
        component={TaskFormScreen}
        options={{
          title:"New task",
          headerStyle:{
            backgroundColor:"#222f3e"
          },
          headerTitleStyle:{
            color:"#ffffff"
          },
          headerTintColor:"white"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  newButton:{
    color:"#ffffff",
    fontSize:15, 
    fontWeight:"bold",
    marginRight:20,
    backgroundColor:"#3993e4",
    padding:5,
    borderRadius:5,
  }
})

export default App
