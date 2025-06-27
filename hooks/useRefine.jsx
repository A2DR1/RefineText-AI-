import { useContext } from 'react';
import { RefineContext } from '../context/RefineContext';

export const useRefine = () => {
    const context = useContext(RefineContext);
    if (!context) {
        throw new Error("useRefine must be used within a RefineProvider");
    }
    return context;
}