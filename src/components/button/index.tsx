
import './styles.css';

interface IButtonProps {
    onClick?: Function;
    text: string;
}

const Button = ({ onClick, text }: IButtonProps) => {
    return <button className="button" onClick={(e) => { onClick?.(e); }}>{text}</button>;
}

export default Button;