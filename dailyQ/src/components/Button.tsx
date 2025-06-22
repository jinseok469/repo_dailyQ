import "./Button.css";

type ButtonType = {
  text : string,
  onClick : () => void,
  className: string,
  children? : any,
}

const Button = ({ text, onClick, className, children }:ButtonType) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
