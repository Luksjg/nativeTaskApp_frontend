import { View, Text, FlatList, RefreshControl, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import { getTasks,deleteTask,updateTask } from '../api'
import { useIsFocused } from '@react-navigation/native'

const TaskList = () => {

  const [tasks,setTasks] = useState([])
  const [refreshing,setRefreshing] = useState(false)

  const loadTasks = async() => {
      setTasks([])
      const data = await getTasks()
      setTasks(data)
  }

  const handleDelete = async(id)=>{
    await deleteTask(id)
    await loadTasks()
  }

  const handleComplete = async(id, task)=>{
    await updateTask(id, task)
    await loadTasks()
  }
  
  
  const renderItem = ({item})=>{
    return <TaskItem task={item} handleDelete={handleDelete} handleComplete={handleComplete}/>
  }
  
  const onRefresh = useCallback(
    async()=>{
      setRefreshing(true)
      await loadTasks()
      setRefreshing(false)
    }  
  )

  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused)loadTasks()
    
  },[isFocused])

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  )
}

export default TaskList