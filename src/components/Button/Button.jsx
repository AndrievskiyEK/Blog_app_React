import './Button.css'

function Button({onClick, disabled, buttonText}) {
  return (
    <button
      className='post__btn'
      onClick={onClick}
      disabled={disabled}>
      {buttonText}
    </button>
  )
}

export default Button
