import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';//setp6 login function part4-for sign out
import { AccountSettings } from '@aws-amplify/ui-react';//step10 delete user

const client = generateClient<Schema>();

function App() {

  const { user, signOut } = useAuthenticator();//setp7 login function part5-for sign out
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

 //step10 delete user
  const handleSuccess = () => {
  alert('user has been successfully deleted')
}//step10 delete user  

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      const userId = user?.signInDetails?.loginId || 'anonymous';
      client.models.Todo.create({
        content: `${content}(${userId})`,
      });
    }
  }
  
  
  
  function deleteTodo(id: string) { //setp1 delete function part1
    client.models.Todo.delete({ id })
  }


  return (
    <main>
      <h1>Welcome to the chatroom</h1>
      <button onClick={createTodo}>Send your message</button>
      <ul>
      {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}
            className="todo-item"
          >
            <div className="message-container">
              <div className="user-info">
              <span className="timestamp right-align">{new Date(todo.createdAt).toLocaleString()}</span>
            </div>
            <span className="todo-content">{todo.content}</span>
            </div>
          </li>
        ))}
      </ul>
      <div>
        🥳 We're glad you guys can chat together.
        <br />

      </div>
      <button onClick={signOut}>Sign out</button> 
      <h1>Hello {user?.signInDetails?.loginId}</h1>
      <AccountSettings.DeleteUser onSuccess={handleSuccess} />
    </main>
  );
}

export default App;
