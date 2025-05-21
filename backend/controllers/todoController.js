import users from '../data/users.json' with { type: 'json' };
import todos from '../data/todos.json' with { type: 'json' };

export const getTodos = (req, res) => {
  const { username } = req.body;
  try {
   
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const userTodos = todos.filter(todo => todo.uID === user.userID);
    res.json(userTodos);
  } catch (error) {
    res.status(500).json({ error: "Todos not found!" });
  }
};