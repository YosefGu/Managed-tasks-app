import React, { useEffect } from "react";
// import { useProjectsContext } from "../hooks/useProjectsContext";
// import { useAuthContext } from '../hooks/useAuthContext';

const api = 'http://localhost:3000'

const Projects = () => {
  // const [projects, dispatch] = useProjectsContext();
  // const {user} = useAuthContext();

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const response = await fetch(`${api}/api/project/projects`, {
  //       headers: {
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: 'SET_PROJECTS', payload: json})
  //     }
  //   }
  //   if (user) {
  //     fetchProjects()
  //   }
  // }, [dispatch, user])

  return (
    <>
    <h1>Projects</h1>
    {/* <h1>Notes</h1>
      <div style={{width:'90%', display:'flex', flexFlow:'wrap'}}>
        <div style={{display:'flex', width:'100%', direction:'colomn'}}>
          {projects && projects.map((project) => (
            <div style={{border: 'black solid 3px'}}>
              <p>{project.title}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  )

}

export default Projects;