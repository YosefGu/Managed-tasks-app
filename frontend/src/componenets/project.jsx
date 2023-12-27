import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useUsersContext } from '../hooks/useUsersContext';

import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditForm from "./editForm";

const api = 'http://localhost:3000';

const Projects = () => {
  const { projects, dispatchProjects } = useProjectsContext();

  const { user } = useAuthContext();
  const { users } = useUsersContext();

  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [able, setAble] = useState(false);

  const handleCardClick = (projectId) => {
    setExpandedProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleEditClick = (projectId) => {
    setEditDialogOpen(true);
    setSelectedProjectId(projectId);
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
  }
  const handleEditSubmit = () => {

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
    fetchProjects();
    setEditDialogOpen(false);
  };

  const handleDeleteClick = async (projectId) => {
    setDeleteDialogOpen(true);
    setSelectedProjectId(projectId);
  };

  const handleDeleteConfirm = async () => {
    setAble(true);
    const response = await fetch(`${api}/api/project/` + selectedProjectId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (response.ok) {
      dispatchProjects({type: 'DELETE_PROJECT', payload: json})
      setAble(false);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      p={2}
    >
      <Box width="75%" height="75%" bgcolor="#7383" overflow="auto" p={2} position='relative'>
        <Typography variant='h4'sx={{ textAlign: 'center', position: 'sticky', top: 0, background: 'white', padding: '10px', zIndex: 1 }}>Projects</Typography>
        <Button color="inherit" component={Link} to="/create">Create</Button>

        {projects && projects.map((project) => (
          <Paper key={project._id} style={{ margin: '10px', padding: '10px', cursor: 'pointer', transition: 'transform 0.3s ease', }}
            onClick={() => handleCardClick(project._id)}
            >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                {project.title}
              </Typography>
              <Box>
                <IconButton onClick={() => handleDeleteClick(project._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleEditClick(project._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/board">
                  <ArrowForwardIcon />
                  <Typography>Board</Typography>
                </IconButton>
              </Box>
            </Box>
            <Divider style={{ margin: '10px 0' }} />
            <Collapse in={expandedProjectId === project._id}>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                {project.description}
              </Typography>
              <Typography variant="subtitle1">Users:</Typography>
              <ul>
                {project.users.map((id) => {
                  const user = users && users.find((u) => u._id === id);
                  return ( 
                    user ? (<li key={id}>{user.name}</li>) : null                                          
                  );
                })}
              </ul>
            </Collapse>
          </Paper>
        ))}

        <Dialog open={editDialogOpen} onClose={handleEditCancel}>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
              <EditForm 
              selectedProjectId={selectedProjectId}
              onUpdate={handleEditSubmit}
              onClose={handleEditCancel}
              /> 
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this project?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" disabled={able}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Projects;
