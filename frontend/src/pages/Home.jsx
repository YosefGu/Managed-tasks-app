import React, { useEffect } from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useUsersContext } from '../hooks/useUsersContext';
import { useAuthContext } from '../hooks/useAuthContext';

const api = 'http://localhost:3000';

const Home = () => {
    const { dispatch } = useUsersContext();
    const { dispatchProjects } = useProjectsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${api}/api/user/users`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });
            const json = await response.json();
      
            if (response.ok) {
              dispatch({type: 'SET_USERS', payload: json})
            }
          }
        const fetchProjects = async () => {
            const response = await fetch(`${api}/api/project/projects`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });
            const json = await response.json();
            if (response.ok) {
              dispatchProjects({ type: 'SET_PROJECTS', payload: json })
            }
          }
          
        fetchProjects()
        fetchUsers();
        },[user ])

    return (
    <>
        <h1>Home</h1>
    </>
)}


export default Home