import React, { useState } from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm rounded-md",
  md: "px-3 py-2 text-base rounded-lg",
  lg: "px-4 py-3 text-lg rounded-xl",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500",
  outlined: "border border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-transparent",
  ghost: "border-none bg-transparent focus:ring-1 focus:ring-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          className={clsx(
            "w-full transition focus:outline-none",
            sizeClasses[size],
            variantClasses[variant],
            {
              "opacity-50 cursor-not-allowed": disabled || loading,
              "border-red-500 focus:border-red-600": invalid,
            }
          )}
        />

        {/* Clear Button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => onChange?.({ target: { value: "" } } as any)}
          >
            ✕
          </button>
        )}

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-2 animate-spin">⏳</div>
        )}
      </div>

      {/* Helper/Error Text */}
      {invalid && errorMessage ? (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
