const Button = ({children, textOnly, className, ...props}) => {
    const cssClasses = className+ ' ' + (textOnly ? 'text-button' : 'button');
    return <button className={cssClasses} {...props}>
        {children}
    </button>
}

export default Button;