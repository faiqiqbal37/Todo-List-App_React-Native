import React,{useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, SafeAreaViewComponent, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native'
import AntDesign from  'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable'



export default function TodoModal({list, closeModal, updateList, deleteList}) {
   
    // const [name, setName] = useState(list.name)
    // const [color, setcolor] = useState(list.color)
    // const [todos, settodos] = useState(list.todos)

    const [newTodo, setnewTodo] = useState("")
    const toggleTodoCompleted = index => {
        list.todos[index].completed = !list.todos[index].completed

        updateList(list);
    }

    const taskCount = list.todos.length
    const completedCount = list.todos.filter(todo => todo.completed).length

   const deleteTodo  = (index) => {
        list.todos.splice(index, 1)
        updateList(list)
    }

    
    
    
    const addTodo = () => {
        list.todos.push({title: newTodo, completed: false})
        updateList(list)
        setnewTodo("")
        Keyboard.dismiss()

    }

    

     
    const renderTodo = (todo, index) => {
        return(
           <Swipeable renderRightActions = {(_, dragX) => rightActions(dragX,index)}>
                <View style = {styles.todoContainer}>
                <TouchableOpacity onPress = {() => toggleTodoCompleted(index)}>
                    <Ionicons
                        name ={todo.completed ? "ios-square" : "ios-square-outline"}
                        size = {24} color = "gray" 
                        style = {{width: 32}}/>
                        
                </TouchableOpacity>
                
                    <Text style = {[styles.todo, {textDecorationLine: todo.completed ? 'line-through' : "none" ,color: todo.completed ? "gray" : "black"}]}>{todo.title}</Text>
                    
                    
                    <TouchableOpacity style = {{alignItems: 'center', marginLeft: 150}} onPress = {() => {deleteTodo(index)}}>
                    <Ionicons
                        name = "close-outline"s
                        size = {27} color = "red" 
                        style = {{width: 32}}/>
                        
                </TouchableOpacity>
                </View>
                
            </Swipeable>
        )
    }

   

   
  const rightActions = (dragX, index) => {
      return (
          <TouchableOpacity>
            <Animated.View style = {styles.deleteButton}>
                <Animated.Text>Delete</Animated.Text>
            </Animated.View>
          </TouchableOpacity>
      )
  }



    return (
        <KeyboardAvoidingView style = {{flex:1}} behavior = "padding">
            <SafeAreaView style = {styles.container}>
                <TouchableOpacity style = {{position: 'absolute', top: 64, right: 40, zIndex:10}} onPress = {() => deleteList(list)}>
                    <Ionicons name = "trash-outline" size = {24} color = "black"/>
                </TouchableOpacity>

                <TouchableOpacity style = {{position: 'absolute', top: 64, right: 10, zIndex:10}} onPress = {() => closeModal()}>
                    <AntDesign name = "close" size = {24} color = "black"/>
                </TouchableOpacity>

                <View style = {[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <Text style = {styles.title}>{list.name}</Text>
                    <Text style = {styles.taskCount}>{completedCount} of {taskCount} tasks</Text>
                </View>

                <View style = {[styles.section, {flex: 3, marginVertical: 16, }]}>
                    <FlatList
                        data = {list.todos}
                        renderItem = {({item, index}) => renderTodo(item, index)}
                        keyExtractor = {(item) => item.title}
                        showsHorizontalScrollIndicator = {false}
                        keyboardShouldPersistTaps = 'always'
                    />
                </View>

                <KeyboardAvoidingView style = {[styles.section, styles.footer]}>

                    <TextInput 
                        style = {[styles.input, {borderColor: list.color}]} 
                        onChangeText = {text => setnewTodo(text)}
                        value = {newTodo} />

                    <TouchableOpacity style = {[styles.addTodo, {backgroundColor: list.color}]} onPress = {() => addTodo()}>
                        <AntDesign name = "plus" size = {16} color = "white"/>
                    </TouchableOpacity>
                    
                </KeyboardAvoidingView>

            </SafeAreaView>
        </KeyboardAvoidingView>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        alignSelf:'stretch',

    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 55,
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingTop: 16
    },
    title:{
     fontSize: 30,
     fontWeight: "800",
     color: "black"   
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: "gray",
        fontWeight: "600"
    },
    footer:{
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16
    },
    input:{
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,

    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: "center"
    },
    todoContainer:{
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 32
    },
    todo:{
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    },
    deleteButton: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    }

})
