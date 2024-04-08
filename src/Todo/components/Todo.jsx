import { useState, useEffect } from 'react';
import { db } from './Firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns'; 
import { VStack, Heading, HStack, IconButton, StackDivider, Text, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const [enteredTodo, setEnteredTodo] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [ updatedTodo, setUpdatedTodo ] = useState("");
  const [ selectedTodoId, setSelectedTodoId ] = useState(null);

  useEffect(() => {
    const tasksCollectionRef = collection(db, 'tasks');
    const unsub = onSnapshot(tasksCollectionRef, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
    }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const todo = enteredTodo;
    const date = enteredDate;

    console.log(date)

    const tasksCollectionRef = collection(db, 'tasks');
    await addDoc(tasksCollectionRef, {
      todo: todo,
      date: date,
    });
  }
  const openEditModal = (id) => {
    setSelectedTodoId(id);
    onOpen();
  };

  const deleteTodo = async (id) => {
    const taskCollectionRef = doc( db, 'tasks', id );
    await deleteDoc(taskCollectionRef)
  }

  const updateTodo = async (id) => {
    const taskCollectionRef = doc( db, 'tasks', id);
    await updateDoc(taskCollectionRef, {
      todo: updatedTodo,
    })
    onClose();
    setUpdatedTodo("");
  }

  return (
    <>
      <VStack p="10" spacing="10">
      <Heading color="blue.200" fontSize="5xl">
        ToDoBox
      </Heading>


      <VStack
      divider={<StackDivider />}
      width="100%"
      bgColor="white"
      // color={{ sm: 'red.600', md: 'blue.600', lg: 'green.500', xl: 'red.600' }}
      borderColor="blackAlpha.100"
      borderWidth="1px"
      borderRadius="3px"
      p={5}
      alignItems="start"
    >
      {tasks.map((task) => {
          let date = task.date;
          if (date instanceof Date === false && date?.toDate instanceof Function) {
            date = date.toDate();
          }
          const formatDate = format(date, 'yyyy/MM/dd');
        return (
          <HStack 
          key={task.id} 
          spacing="5" 
          justifyContent="flex-start"
          width="100%"
          >
          <Text minWidth="200px">{task.todo}</Text>
          <Text>{formatDate}</Text>
          <HStack spacing="2">
            <IconButton icon={<AiOutlineForm />} isRound onClick={() => openEditModal(task.id)}>
              編集
            </IconButton>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>編集する</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                    <Input
                    placeholder="タスクを編集する"
                    _placeholder={{ opacity: "0.3", color: "gray.500" }}
                    size="lg"
                    p={3}
                    bgColor="white"
                    variant="flushed"
                    value={updatedTodo}
                    onChange={(e) => setUpdatedTodo(e.target.value)}
                    />
                    <Button
                    colorScheme="blue"
                    size="md"
                    bgColor="white"
                    variant="outline"
                    px={7}
                    type="submit"
                    onClick={() => updateTodo(selectedTodoId)}
                    >更新</Button>
                    </ModalFooter>
                </ModalContent>
        </Modal>
            <IconButton
            icon={<AiOutlineDelete />} 
            isRound bgColor="cyan.100"
            onClick={() => deleteTodo(task.id)}
            >
            削除
            </IconButton>
          </HStack>
        </HStack>
        );
      })}
      </VStack>
      <form onSubmit={addTodo}>
        <HStack>
          <Input
            placeholder="新しいタスク"
            _placeholder={{ opacity: "0.3", color: "gray.500" }}
            size="lg"
            p={3}
            bgColor="white"
            variant="flushed"
            value={enteredTodo}
            onChange={(e) => setEnteredTodo(e.target.value)}
          />
          <Input
            placeholder="Select Date and Time"
            bgColor="white"
            variant="flushed"
            size="lg"
            type="date"
            value={enteredDate}
            onChange={(e) => setEnteredDate(e.target.value)}
          />
          <Button
            colorScheme="blue"
            size="md"
            bgColor="white"
            variant="outline"
            px={7}
            type="submit"
          >
            追加
          </Button>
        </HStack>
      </form>
      </VStack>
    </>
  );
};
export default Todo;
