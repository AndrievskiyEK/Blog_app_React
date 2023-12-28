import './Textarea.css'

function Textarea({value, onChange}) {
  return (
    <textarea   
      className='post__text-input'
      placeholder='Введите текст'    
      rows="4"      
      onInput={onChange}
      value={value}>
    </textarea>
  )
}

export default Textarea
