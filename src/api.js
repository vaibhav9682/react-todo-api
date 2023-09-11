

// fetch todo 
export const fetchList = async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => data)
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
}


// create todos

export const createTask = (data, id) => {
    // console.log(data, id)
    const { title, completed } = data


    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            completed: completed,
            userId: 11,
            id: id
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));

}

// delete todos
export const deleteTask = (id) => {

    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res)

}


// update todos
export const updateTodo = (data, id) => {

    // console.log(data, id)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: data.title,
            completed: data.completed,
            userId: 11,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}