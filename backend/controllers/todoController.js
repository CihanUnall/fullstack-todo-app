import users from '../data/users.json' with { type: 'json' };
import todos from '../data/todos.json' with { type: 'json' };

export const getTodos = (req, res) => {
  const { username } = req.body;
  try {
   
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
  const userTodos = todos.filter(todo => todo.uID === user.userID && todo.state === false);
    res.json(userTodos);
  } catch (error) {
    res.status(500).json({ error: "Todos not found!" });
  }
};
export const addTodo = (req, res) => {
  const { userID, text } = req.body;
  
  try {
    // Yeni Todo nesnesi oluştur
    const newTodo = {
      userID: todos.length + 1,
      text,
      userID,
      state: false
    };

    todos.push(newTodo); // Todo'yu ekle

    res.status(201).json(newTodo); // Yeni Todo'yu döndür
  } catch (error) {
    res.status(500).json({ error: 'Error adding todo!' });
  }
};
export const updateTodo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  try {
    const todo = todos.find(todo => todo.id === parseInt(id));

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = completed; // Durumu güncelle
    res.json(todo); // Güncellenmiş todo'yu döndür
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo!' });
  }
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;

  try {
    todos = todos.filter(todo => todo.id !== parseInt(id)); // Todo'yu sil

    res.status(204).end(); // Başarıyla silindi
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo!' });
  }
};