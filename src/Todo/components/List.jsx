import { useState } from 'react';
import { format } from 'date-fns'; 
import { VStack, HStack, IconButton, StackDivider, Text, useDisclosure } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";
import MakeMordal from './MakeMordal';

const List = ({tasks, updateTodo, deleteTodo}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ updatedTodo, setUpdatedTodo ] = useState("");
    const [ selectedTodoId, setSelectedTodoId] = useState("");

    const openEditModal = (id) => {
        setSelectedTodoId(id);
        onOpen();
    };

    const completeTasks = (id) => {
        deleteTodo(id);
    }

    const editTasks = (id) => {
        updateTodo( id, updatedTodo );
        setUpdatedTodo("");
        onClose();
    }

    return (
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
                <Text minWidth="100px">{formatDate}</Text>
                <IconButton icon={<AiOutlineForm />} isRound onClick={() => openEditModal(task.id)}>
                編集
                </IconButton>
                <MakeMordal isOpen={isOpen} onClose={onClose} updatedTodo={updatedTodo} setUpdatedTodo={setUpdatedTodo} editTasks={editTasks} selectedTodoId={selectedTodoId} />
                <IconButton
                icon={<AiOutlineDelete />} 
                isRound bgColor="cyan.100"
                onClick={() => completeTasks(task.id)}
                >
                削除
                </IconButton>
            </HStack>
            );
        })}
        </VStack>
    )
}
export default List;