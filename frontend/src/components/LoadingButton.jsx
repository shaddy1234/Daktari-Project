import React from 'react';
import Loader from './Loader';

const LoadingButton = ({
  isLoading,
  children,
  disabled,
  className = '',
  type = 'button',
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        px-4
        py-2
        border
        border-transparent
        text-sm
        font-medium
        rounded-md
        shadow-sm
        text-white
        bg-blue-600
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-blue-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader size="small" color="white" />
          <span className="ml-2">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;