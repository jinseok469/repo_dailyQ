import "./Button.css";

const Button = ({ text, onclick, className, children }) => {
  return (
    <button className={className} onClick={onclick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
