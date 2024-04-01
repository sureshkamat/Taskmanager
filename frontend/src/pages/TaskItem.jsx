import { Box, Button, FormControl, FormLabel, Select ,useDisclosure} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../action/taskAction';
import EditTaskModal from './EditTaskModal';

export const TaskItem = ({ task}) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState(task.status);
    const [priorities, setPriorities] = useState(task.priorities);
    const { token } = useSelector(state => state.user);
  
   

    const handleDelete = (id,token) => {
         dispatch(deleteTask(id,token))
    }
    const formattedCreatedAt = formatDistanceToNow(new Date(task.createdAt), { addSuffix: true });
        return (

        <Box width={['90%', '60%', '45%', '30%']} border="1px solid #E2E8F0" borderRadius="md" padding="20px">
            <Box fontSize="lg" fontWeight="bold">{task.name}</Box>
            <Box fontSize="lg" fontWeight="bold">{formattedCreatedAt}</Box>
            <Box mt={2}>{task.description}</Box>
            <FormControl mt={4}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel htmlFor="priorities">Priorities</FormLabel>
                <Select id="priorities" value={priorities} onChange={(e) => setPriorities(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                </Select>
            </FormControl>
            <Box><Button mt={4} colorScheme="blue" onClick={onOpen}>Edit</Button>
                <Button mt={4} ml={2} colorScheme="red" onClick={() => handleDelete(task._id,token)}>Delete</Button></Box>
                <EditTaskModal isOpen={isOpen} onClose={onClose} task={task}/>
        </Box>


    )
}
