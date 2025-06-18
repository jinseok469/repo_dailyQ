import "./Button.css";

const Button = ({ text, onClick, className, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
