import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../action/taskAction';
import { Table, Thead, Tbody, Tr, Th, Td ,Button} from '@chakra-ui/react';

export const Tasks = () => {
    const dispatch = useDispatch();
     const {  tasks, error } = useSelector(state => state.task);
   console.log(tasks);
   
   console.log(error);
    useEffect(()=>{
        dispatch(getTasks());
    },[dispatch])
  return (
    <div>
      <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Status</Th>
          <Th>Priorities</Th>
          <Th>Update</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks && tasks.map((task, index) => (
          <Tr key={index}>
            <Td>{task.name}</Td>
            <Td>{task.description}</Td>
            <Td>{task.status}</Td>
            <Td>{task.priorities}</Td>
            <Td><Button>Edit</Button></Td>
            <Td><Button>Delete</Button></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </div>
  )
}
