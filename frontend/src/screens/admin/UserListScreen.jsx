import React from 'react'
import {Button, Table} from 'react-bootstrap'
import { FaTrash,FaTimes,FaEdit, FaCheck} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
// import { useGetOrdersQuery } from '../../Slices/ordersApiSlice'
import { useDeleteUserMutation, useGetUsersQuery } from '../../Slices/userApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const UserListScreen = () => {
    const {data:users,isLoading,error,refetch}= useGetUsersQuery()
    const [deleteUser]=useDeleteUserMutation();


    const deleteHandler= async(id)=>{
        if(window.confirm("Are you sure?")){
            try {
                await deleteUser(id)
                refetch();
                toast.success('User deleted')
            } catch (error) {
                toast.error(error?.data?.message || error?.error)
            }
        }
    }
    return (
    <>
    <h3>Users </h3>
    {isLoading  ? <Loader/>: error?<Message variant='danger'>{error}</Message> :(
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user)=>(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                        <td>{user.isAdmin?<FaCheck style={{color:"green"}}/>:<FaTimes style={{color:"red"}}/>}</td>
                        <td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                            <Button variant='info' className='btn-sm'>
                                <FaEdit style={{color:"white"}}/>
                            </Button>
                        </Link>

                        <Button variant='danger' className='btn-sm mx-2' onClick={()=>deleteHandler(user._id)}>
                            <FaTrash style={{color:"white"}}/>

                        </Button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    )}
    </>
    )
}

export default UserListScreen