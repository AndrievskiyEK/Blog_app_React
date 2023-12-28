import { useEffect, useState } from 'react'
import Headling from '../Headling/Headling'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Button from '../button/Button'
import { createPost, getPost, deletePost } from '../../api/Firebase'
import { addActivNull } from '../../utils/addActivNull'
import './PostSection.css'

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

function PostSection() { 
  
  const [userInputValue, setUserInputValue] = useState({
    title: '',
    text: '',
  })
  const [buttonText, setButtonText] = useState('Опубликовать')   
  
  const [posts, setPosts] = useState(null);   
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationUserInput, setValidationUserInput] = useState({
    errorTitleNull: true,
    errorTextNull: true,
    errorTitleLength: false,
    errorTextLength: false,
  })

  
  

  useEffect(()=>{
    setIsError(false);
    setIsPostsLoading(true);
    getPost()
      .then(updatePost => {  
        setIsPostsLoading(false);      
        setPosts(updatePost);
      })
      .catch(error => {
        setIsPostsLoading(false);
        setIsError(true);
      })      
  }, [])
  

  function handleInputTitle (e){
    setUserInputValue({...userInputValue,
      title: e.target.value}) 
    if (e.target.value.trim() === ""){
        setValidationUserInput(prevState => {
        return { ...prevState, errorTitleNull: true };
        });
    }  
    else {setValidationUserInput(prevState => {
      return { ...prevState, errorTitleNull: false };
      });
    }  
    if (e.target.value.length > TITLE_VALIDATION_LIMIT){
      setValidationUserInput(prevState => {
        return { ...prevState, errorTitleLength: true };
        });
    }  
    else {setValidationUserInput(prevState => {
      return { ...prevState, errorTitleLength: false };
      });
    }     
    console.log(validationUserInput) 
     
  }

  function handleInputText (e){
    setUserInputValue({...userInputValue,
      text: e.target.value})    
    if (e.target.value.trim() === ""){
        setValidationUserInput(prevState => {
        return { ...prevState, errorTextNull: true };
        });
    }  
    else {setValidationUserInput(prevState => {
      return { ...prevState, errorTextNull: false };
      });
    }  
    if (e.target.value.length > TEXT_VALIDATION_LIMIT){
      setValidationUserInput(prevState => {
        return { ...prevState, errorTextLength: true };
        });
    }  
    else {setValidationUserInput(prevState => {
      return { ...prevState, errorTextLength: false };
      });
    }   
    console.log(validationUserInput) 
  } 
  

  async function handleAddPost (e){    
    e.preventDefault();    
    const currentdata = new Date();
    const Month = currentdata.getMonth();
    const Minutes = currentdata.getMinutes();
    const Secondes = currentdata.getSeconds();
    const data = `${currentdata.getDate()}.${addActivNull(Month)}.${currentdata.getFullYear()} ${currentdata.getHours()}:${addActivNull(Minutes)}:${addActivNull(Secondes)}`;     
    
    const newPost = {
      title: userInputValue.title,
      text: userInputValue.text,      
      data: data,
    };
    createPost(newPost);  
 
    const updatePost = await getPost();
    
    setPosts(updatePost);      
    setUserInputValue({
      title: '',
      text: '',
    }); 
    setValidationUserInput({
      errorTitleNull: true,
      errorTextNull: true,
      errorTitleLength: false,
      errorTextLength: false
    })   
    setButtonText('Опубликовать')    
  }

  function handleDeletePost(id){
    deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
  }

  function handleEditPost(post){
    setUserInputValue({
      title: post.title,
      text: post.text,
    });   
    setValidationUserInput({
      errorTitleNull: false,
      errorTextNull: false,
      errorTitleLength: false,
      errorTextLength: false
    })     
    deletePost(post.id); 
    setButtonText('Сохранить')       
  }
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Headling text = {'Новый пост'}/>
          <form action="">            
            <Input            
            onChange={handleInputTitle}
            value={userInputValue.title}
            />
            {validationUserInput.errorTitleLength && <p className='validation__text'>Заголовок поста не должен превышать {TITLE_VALIDATION_LIMIT} символов</p>}            
            <Textarea
            onChange={handleInputText}
            value={userInputValue.text}/>
            {validationUserInput.errorTextLength && <p className='validation__text'>Текст поста не должен превышать {TEXT_VALIDATION_LIMIT} символов</p>}
            <Button
            buttonText={buttonText}
            onClick={handleAddPost}
            disabled = {validationUserInput.errorTitleNull || validationUserInput.errorTextNull || validationUserInput.errorTitleLength || validationUserInput.errorTextLength}/>
            {(validationUserInput.errorTitleNull || validationUserInput.errorTextNull) && 
            <p className='validation__text'>Заголовок поста и текст поста не могут быть пустыми</p>}
            
          </form>          
        </div>
        <div className='col'>
          <div className='posts__section'>
          <Headling text = {'Лента'}/>
          <div className='posts'>
                {isError && <p className='post__title'>Произошла ошибка... обновите страницу</p>}
                {isPostsLoading && <p className='post__title'>Идет загрузка постов...</p>}                
                  {posts && posts.map(post => {
                  return <div className='post' key={post.id}>
                           <p className='post__title'>{post.title}</p>
                           <p className='post__text'>{post.text}</p>
                           <p className='post__data'>{post.data}</p>
                           <button className='post__btn-delete' onClick={() => handleDeletePost(post.id)}></button>
                           <button className='post__btn-edit' onClick={() => handleEditPost(post)}></button>
                         </div>})}
            
          </div>
          </div>
        </div>
      </div>     
    </div>
  )
}
export default PostSection
