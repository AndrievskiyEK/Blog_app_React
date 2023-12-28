import './App.css'
import PostSection from './components/PostSection/PostSection'


function App() { 
  /* const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false)
    setIsTodosLoading(true) 
    
    setTodos(mockTodos) 
    setIsTodosLoading(false)
  },[])

  console.log(todos) */

  return (
    <div className='container'>
{/*       <h1>Список задачи</h1>
      {isError && <p>Произошла ошибка</p>}

      {isTodosLoading && <p>Загружаем список задач</p>} */}
     <PostSection/>
    </div>
  )
}
/* {"тут пока пусто ... "}  */
export default App
