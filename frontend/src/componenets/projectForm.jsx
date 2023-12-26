import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

import { useAuthContext } from '../hooks/useAuthContext';
import { useUsersContext } from '../hooks/useUsersContext';

const api = 'http://localhost:3000'

const ProjectForm = () => {
  const {users, dispatch } = useUsersContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [selectUsers, setSelectedUsers] = useState([]);
  const [selectAuthor, setSelectAuthor] = useState([]);
  
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
    fetchUsers();
  },[])

  const renderSelectedAuthor = (selected, users) => {
    return selected.map((selectedUserId) => {
      const selectAuthor = users.find((user) => user._id === selectedUserId);
      return selectAuthor ? selectAuthor.name : '';
    }).join(', ');
  };
  const renderSelectedUsers = (selected, users) => {
    return selected.map((selectedUserId) => {
      const selectedUser = users.find((user) => user._id === selectedUserId);
      return selectedUser ? selectedUser.name : '';
    }).join(', ');
  };

  const handleUserSelectChange = (event) => {
    setSelectedUsers(event.target.value);
  };
  const handleAuthorSelectChange = (event) => {
    setSelectAuthor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('You must be logged in')
    }
    const project = {title, description, users: selectUsers, author: selectAuthor}
    const response = await fetch(`${api}/api/project/create`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
  })
  const json = await response.json()

  if (!response.ok) {
    setError(json.error);
  }
  if (response.ok) {
    setTitle('');
    setDescription('');
    setSelectedUsers([]);
    setSelectAuthor([]);
    setError(null);
    console.log('New project added', json)
  }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <InputLabel id="users-label">Users</InputLabel>
            <Select
              labelId="users-label"
              id="users"
              multiple
              fullWidth
              value={selectUsers}
              onChange={handleUserSelectChange}
              renderValue={() => renderSelectedUsers(selectUsers, users)}
            >
              {users && users.map((u) => (
                u.email !== user.email ? (
                  <MenuItem key={u._id} value={u._id}>{u.name}-{u.lName}</MenuItem>
                ) : null
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
              labelId="author-label"
              id="author"
              multiple
              fullWidth
              value={selectAuthor}
              onChange={handleAuthorSelectChange}
              renderValue={() => renderSelectedAuthor(selectAuthor, users)}
            >
              {users && users.map((u) => (
                u.email !== user.email ? (
                  <MenuItem key={u._id} value={u._id}>{u.name}-{u.lName}</MenuItem>
                ) : null
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Add Project
          </Button>
        </Box>
        {error && <Typography>{error}</Typography>}
      </form>
    </Container>
  );
};

export default ProjectForm;
