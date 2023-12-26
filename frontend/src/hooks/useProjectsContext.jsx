import { useContext } from "react";
import { ProjectsContext } from "../context/projectContext";

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext);

    if (!context) {
        throw Error('useProjectsContext must be used inside an ProjectsContextProvider')
    }
    return context
}
    