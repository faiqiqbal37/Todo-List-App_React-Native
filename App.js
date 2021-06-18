/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  ViewComponent,
} from 'react-native';
import{ Component } from 'react'
import AntDesign from  'react-native-vector-icons/AntDesign';
import tempData from './tempData'
import TodoList from './Components/TodoList'
import AddListModal from './Components/AddListModal'
import Fire from './Fire'
import firestore from '@react-native-firebase/firestore'



export default class App extends Component {
  
    

  constructor(props){
    super(props)
    this.state = {
    addTodoVisible: false,
    lists: [], 
    user: {},
    loading: true
    
  }

} 



 componentDidMount() {
  firebase = new Fire((error, user) => {
    if (error) {
      return alert("Something went Wrong!")
    }

    firebase.getLists(lists => {
      this.setState({ lists,user }, () => {
        this.setState({loading: false})
      })
    })

    this.setState({user})
  })

 }

 


  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible})
  }

  renderList = list => {
      return <TodoList deleteList = {this.deleteList} list = {list} updateList = {this.updateList}  />
  }

  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: []}]})
    // this.writeListAddTodo(list)
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    })
    

  }

  deleteList = list => {
    firebase.deleteList(list)
  }

  updateList  = list => {
      firebase.updateList(list)
      // this.writeListAddTodoList(list)

      
  }

  

  writeListAddTodo(list) {
    firestore()
    .collection('users')
    .doc("menyP2UxdtkMckZygjp6")
    .collection("lists")
    .add({
      color: list.color,
      name: list.name,
      todos: []

    })
    .then((docRef) => {
      console.log('User added with an id!', docRef.id);
      id = docRef.id;
    });  
}

getListID = () => {
 
}

writeListAddTodoList(list) {
  firestore()
  .collection('users')
  .doc("menyP2UxdtkMckZygjp6")
  .collection("lists")
  .doc(id)
  .update({
    
    todos: list.todos

  }, {merge: true})
  .then(() => {
    console.log('User added!');
    id = null;
  });  
}


  
  
  render() {
    return (
      <View style = {styles.container}>
        <Modal 
        animationType = 'fade' 
        visible = {this.state.addTodoVisible} 
        onRequestClose = {() => this.toggleAddTodoModal()}>
        
        <AddListModal  closeModal = {() => this.toggleAddTodoModal()} addList = {this.addList} />
        
        </Modal>
        
        <View style = {{flexDirection: 'row'}}>
          <View style = {styles.divider}/>
          <Text style = {styles.title}>
            Todo <Text style = {{ fontWeight: '300', color: 'blue'}}>Lists</Text>
          </Text>
          <View style = {styles.divider}/>
        </View>
        
        <View style = {{marginVertical: 48}}>
          
          <TouchableOpacity style = {styles.addList} onPress = {() => this.toggleAddTodoModal()}>
            <AntDesign name = "plus" size = {16} color = "blue" />
          </TouchableOpacity>

          <Text style = {styles.add}>Add List</Text>

        </View>

        <View style = {{height: 275, paddingLeft: 32}}>
          <FlatList
            data = {this.state.lists}
            keyExtractor = {item => item.name}
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            renderItem = {({item}) => (
              this.renderList(item)
              )}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: 'center'

  },
  divider: {
    backgroundColor: '#add8e6',
    height: 1,
    flex: 1,
    alignSelf: 'center', 
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: 'black',
    paddingHorizontal: 64
  },
  addList:{
    borderWidth: 2,
    borderColor: '#add8e6',
    borderRadius: 4,
    padding: 16,
    alignItems:'center',
    justifyContent: 'center'
  },
  add: {
    color: 'blue',
    fontWeight: "600",
    fontSize:14,
    marginTop: 8
  }


});



