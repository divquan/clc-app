export const ADD_USER = "ADD_USER";


export const addUser = (task: any) => ({
    type: ADD_USER,
    payload: {
        name: task.name,
        email: task.email,
        imgURL: task.imgURL,
    }
});