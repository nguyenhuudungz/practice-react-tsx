import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.scss';
import { Place, Todo } from './types';
import { isTypeNode } from 'typescript';

function App() {
  const [list, setList] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [place, setPlace] = React.useState<Place>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    pullList();
  }, []);

  const pullList = () => {
    setIsLoading(true);
    axios.get(process.env.REACT_APP_BASE_URL + '/todo-list/').then((response) => {
      const { data } = response;
      setList(data);
      setIsLoading(false);
    });
  };

  const handleEnterNewItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (title !== '' && event.key === 'Enter') {
      setIsLoading(true);
      axios.post(process.env.REACT_APP_BASE_URL + '/todo-list/', { title: title }).then((response) => {
        pullList();
      });
      setTitle('');
    }
  };

  const handleDeleteItem = (id: string) => {
    setIsLoading(true);
    axios.delete(process.env.REACT_APP_BASE_URL + '/todo-list/' + id).then((response) => {
      pullList();
    });
  };

  const toogleFinishItem = (id: string) => {
    setIsLoading(true);
    axios.put(process.env.REACT_APP_BASE_URL + '/todo-list/' + id).then((response) => {
      pullList();
    });
  };

  return (
    <div className="app">
      <h1 className="app__title">To-do List</h1>
      <input
        type="text"
        className="app__new-item"
        placeholder="Enter new item"
        onKeyPress={handleEnterNewItem}
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
      />
      <span>Current place is: {typeof place === 'string' ? place : place?.custom}</span>
      <button onClick={() => setPlace('home')}>Home</button>
      <button onClick={() => setPlace('work')}>Work</button>
      <input
        type="text"
        placeholder="Enter a place"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPlace({ custom: event.target.value })}
      />
      {isLoading ? <span>Loading...</span> : <span>Done</span>}
      <div className="app__todo-list">
        {list.map((item: Todo) => (
          <div key={item.id} className="app__todo-item">
            <div>
              <input type="checkbox" onChange={() => toogleFinishItem(item.id)} />
              <span>{item.title}</span> ||{' '}
              <span>{typeof item.place === 'string' ? item.place : item.place?.custom}</span>
            </div>
            <button onClick={() => handleDeleteItem(item.id)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
