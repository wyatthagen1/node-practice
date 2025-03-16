// db 

const authors = [
    {id: 1, name: "Bryan"},
    {id: 2, name: "John"},
    {id: 3, name:"Dickhead"}
]

async function getAuthorById(id:number) {
    return authors.find(author => author.id === id)
}

async function allAuthors() {
    return authors
}

export {getAuthorById, allAuthors}