import { View, StyleSheet, StatusBar} from 'react-native'
import React from 'react'

const Layout = ({children}) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#22f3e"/>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#e3ebf2",
        padding: 25,
        flex: 1,
        alignItems: "center",
    }
})


export default Layout