import {useEffect } from 'react';

export const useEscape = (onEscape) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if(event.keyCode === 27){
                onEscape();
            }
        }
        document.addEventListener('keydown',handleEscape, false)
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [onEscape]);
}