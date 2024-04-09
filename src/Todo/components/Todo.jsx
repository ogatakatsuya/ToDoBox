import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns'; 
import { VStack, Heading, HStack, IconButton, StackDivider, Text, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useToast } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

    if (!enteredTodo) {
      toast({
        title: "新しいタスクを入力してください",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (!enteredDate) {
      toast({
        title: "期限を入力してください",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const todo = enteredTodo;
    const date = enteredDate;

    const tasksCollectionRef = collection(db, 'tasks');
    await addDoc(tasksCollectionRef, {
      todo: todo,
      date: date,
    });

    setEnteredTodo("");
    toast({
      title: "新しいタスクを追加しました！",
      description: enteredTodo,
      status: "info",
      duration: 3000,
      isClosable: true,
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
    toast({
      title: "タスクを編集しました！",
      description: updatedTodo,
      status: "info",
      duration: 3000,
      isClosable: true,
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


      <VStack
      divider={<StackDivider />}
      width="100%"
      bgColor="white"
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
          <HStack spacing="2" width="150px">
            <Text minWidth="100px">{formatDate}</Text>
            <HStack spacing="2">
              <IconButton icon={<AiOutlineForm />} isRound onClick={() => openEditModal(task.id)}>
                編集
              </IconButton>
              <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
[                      <ModalContent>
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
              </ModalContent>]
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
        </HStack>
      );
    })}
      </VStack>
      <form onSubmit={addTodo} width="100%">
        <HStack
        width="100%" >
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
