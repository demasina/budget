export const ADD_NAME = 'ADD_NAME';

export const addName = (text) => {
    return {
        type: ADD_NAME,
        text
    }
}