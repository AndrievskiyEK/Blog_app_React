import './input.css'

function Input({value,onChange}) {
  return (
    <input 
    className = "post__header-input"
    type='text'
    placeholder='Заголовок поста'
  /*   value={value} */
    onChange={onChange}
    value={value}
    />
  )
}

export default Input


