export default function Button({ disabled = false, className = "", btnText, ...props }) {
    return (
        <button
            disabled={disabled}
            {...props}
            className={`disabled:cursor-not-allowed bg-slate-500 ${className}`}
        >
            {btnText}
        </button>
    );
}
