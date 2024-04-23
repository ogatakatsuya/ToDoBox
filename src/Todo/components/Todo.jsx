import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { VStack, Heading, useToast} from '@chakra-ui/react';

import List from './List';
import Form from './Form';
import Logout from './Logout';

const Todo = ({setUser, user_id}) => {
  const [tasks, setTasks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const tasksCollectionRef = collection(db, 'tasks');
    const q = query(tasksCollectionRef, where("user_id", "==", user_id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, [user_id]);

  const deleteTodo = async (id) => {
    const taskCollectionRef = doc( db, 'tasks', id );
    await deleteDoc(taskCollectionRef)
  }

  const updateTodo = async (id,updatedTodo) => {
    const taskCollectionRef = doc( db, 'tasks', id);
    await updateDoc(taskCollectionRef, {
      todo: updatedTodo,
    })
    toast({
      title: "タスクを編集しました！",
      description: updatedTodo,
      status: "info",
      duration: 3000,
      isClosable: true,
    });  
  }

  const createTodo = async ( todo, date ) => {
    console.log("task add");
    const tasksCollectionRef = collection(db, 'tasks');
    await addDoc(tasksCollectionRef, {
        todo: todo,
        date: date,
        user_id: user_id,
    });
  }

  return (
    <>
    <VStack 
    p="10" 
    spacing="10"
    alignContent="center">
      <Heading color="blue.200" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
        ToDoBox
      </Heading>
      <List tasks={tasks} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      <Form createTodo={createTodo}/>
      <Logout setUser={setUser}/>
    </VStack>
  </>
  );
};
export default Todo;
