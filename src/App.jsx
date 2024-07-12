import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  console.log(data)

  return (
    <div className='max-w-7xl gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      {
        data.map(post => (
        <div className='bg-base-200 shadow-md p-5' key={post.id}>
            <h2 className='text-2xl'>{post.title}</h2>
            <p>{post.body}</p>
          </div>)
        )
      }
    </div>
  );
};

export default App;