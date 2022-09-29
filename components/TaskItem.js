import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const TaskItem = ({task,handleDelete, handleComplete}) => {

  const navigation = useNavigation()

  const [taskComplete, setTaskComplete] = useState({
    title: task.title,
    description: task.description,
    complete: "true"
  })

  const completar = async(task)=>{
    setTaskComplete({
      title: task.title,
      description: task.description,
      complete: true
    })
    await handleComplete(task.id, taskComplete)
  }

  
  if(task.complete === "true"){
  return (
    <View style={styles.itemContainerComplete}>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("TaskFormScreen", {id:task.id})}
      style={{maxWidth:"60%"}}
      >
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.itemDescription}>{task.description}</Text>
      </TouchableOpacity>

      <View style={{flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",}}>
        <TouchableOpacity 
          style={{backgroundColor:"#ee5253", padding:8, borderRadius:5,marginLeft:4}}
          onPress = {()=>{handleDelete(task.id)}}
        >
          <Text style={{color:"#ffffff"}}>Borrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  ) }else{
    // Tareas sin completar
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("TaskFormScreen", {id:task.id})}
        style={{maxWidth:"60%"}}
        >
          <Text style={styles.itemTitle}>{task.title}</Text>
          <Text style={styles.itemDescription}>{task.description}</Text>
        </TouchableOpacity>
  
        <View style={{flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",}}>
          <TouchableOpacity 
            style={{backgroundColor:"#ee5253", padding:8, borderRadius:5,marginLeft:4}}
            onPress = {()=>{handleDelete(task.id)}}
          >
            <Text style={{color:"#ffffff"}}>Borrar</Text>
          </TouchableOpacity>         
          <TouchableOpacity 
            style={{backgroundColor:"#42dc00", padding:8, borderRadius:5,marginLeft:4}}
            onPress = {()=>{completar(task)}}
          >
            <Text style={{color:"#ffffff"}}>Completar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
   
  
}

const styles = StyleSheet.create({
    itemContainer:{
      backgroundColor: "#edf7ff",
      borderWidth: 2,
      borderColor:"red",
      padding: 10,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 5,
      width:"1",
    },    
    itemContainerComplete:{
      backgroundColor: "#edf7ff",
      padding: 10,
      borderWidth: 2,
      borderColor:"#3fd400",
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 5,
      width:"1",
    },
    itemDescription:{
        color:"#545454",
        
    },
    itemTitle:{
      color:"#000000",
      fontWeight:"bolder"
    }

})

export default TaskItem