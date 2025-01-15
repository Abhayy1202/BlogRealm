import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    forlabel="",
    ...props
}, ref){
    const id = useId()
    return (
      <div className="w-full">
        {label && (
          <label
            className={`block text-sm font-medium ${
              forlabel
                ? forlabel
                : "text-neutral-700 dark:text-neutral-300 mb-2"
            } `}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={`w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-purple-500 ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
})

export default Input