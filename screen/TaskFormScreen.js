import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { TouchableOpacity } from 'react-native-web'
import { saveTask, getTask, updateTask, getTasks } from '../api'

const TaskFormScreen = ({navigation,route}) => {

  const [task,setTask] = useState({
    title:"",
    description:"",
    complete:false
  })

  const loadTasks = async() => {
    const data = await getTasks()
  }

  const [editing, setEditing] = useState(false)

  const [disabledButton, setDisabledButton] = useState(true)

  const handleChange= (name,value) => {
    task.title.length > 1 ? setDisabledButton(false) : setDisabledButton(true)
     setTask({
      ...task,
      [name]:value
     })
  }

  const handleSubmit= async()=>{
    if(editing){
      await updateTask(route.params.id, task) 
    }else{
      await saveTask(task)
    }
    await loadTasks()
    navigation.navigate("HomeScreen")

  }

  useEffect(()=>{
    if(route.params && route.params.id){
      setEditing(true)
      navigation.setOptions({headerTitle: "Update a task"});
      (async()=>{
        const task = await getTask(route.params.id)
        setTask({
          title: task.title,
          description: task.description,
          complete: false
        })
      })()
    }
  },[])

  return (
    <Layout>

      <View>
        <Image
        style={{
          width: 66,
          height: 58,
          marginVertical:10,
          padding:10,
          
        }}
        source={{uri:"https://www.freeiconspng.com/thumbs/notepad-icon/notepad-icon-1.png"}}
        />
      </View>

      <TextInput
      style={styles.input}
      placeholder='Titulo'
      placeholderTextColor="#576574"
      onChangeText={(text) => handleChange("title",text)}
      value={task.title}
      />
      <TextInput
      style={styles.input}
      placeholder='Descripcion'
      placeholderTextColor="#576574"
      onChangeText={(text) => handleChange("description",text)}
      value={task.description}
      />

      <TouchableOpacity 
      style={styles.buttonSave}
      disabled= {disabledButton ? true : false}
      onPress = {()=>handleSubmit()}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

    </Layout>
  )
}

const styles = StyleSheet.create({
  input:{
    width:"90%",
    fontSize:14,
    marginBottom:7,
    borderWidth:1,
    borderColor:"#3993e4",
    height:30,
    color:"black",
    padding:4,
    borderRadius:5,
    textAlign:"center"
  },
  buttonSave:{
    paddingVertical:5,
    borderRadius:5,
    marginBottom:12,
    marginTop:15,
    backgroundColor:"#3993e4",
    width:"90%"
  },
  buttonText:{
    color:"black",
    textAlign:"center"
  }
})

export default TaskFormScreen