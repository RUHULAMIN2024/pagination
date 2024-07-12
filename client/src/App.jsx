import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState([])
  const [itemPerPage, setItemPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const count = data.length;
  const pageCount = Math.ceil(count / itemPerPage);
  const pages = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  
  const handleItemPerPage = (e) => {
    setItemPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1)
  }
  return (
    <div>
      <div className='max-w-7xl gap-5  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {
          data.map(post => (
            <div key={post.id} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
              <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{post.title}</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
              </div>
            </div>
          ))
        }

      </div>
      <div>
        <ul className="flex items-center my-5 gap-2 justify-center">
          <li className='cursor-pointer px-3 py-2 text-gray-700 hover:text-gray-900' onClick={handlePrev}>Prev</li>
          {pages.map(page => (
            <li onClick={()=>setCurrentPage(page)} key={page} className={`cursor-pointer px-3 py-2 text-gray-700 hover:text-gray-900 ${page === currentPage? 'border-b-2 border-blue-500' : ''}`}>
              {page}
            </li>
          ))}
          <li className='cursor-pointer px-3 py-2 text-gray-700 hover:text-gray-900' onClick={handleNext}>Next</li>
          <li>
            <select onChange={handleItemPerPage} name={itemPerPage} id="">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;