import React, { forwardRef, useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable Nuzio SearchInput
 */
export const SearchInput = forwardRef(
  (
    {
      value,
      defaultValue = '',
      onChange,
      onClear,
      placeholder = 'Search news, topics, or AI sources...',
      shortcutKey,
      size = 'medium',
      fullWidth = true,
      className = '',
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalVal, setInternalVal] = useState(defaultValue);
    const currentValue = isControlled ? value : internalVal;

    const handleChange = (e) => {
      if (!isControlled) {
        setInternalVal(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e) => {
      if (!isControlled) {
        setInternalVal('');
      }
      onClear?.(e);
    };

    return (
      <div
        className={`nuzio-search-wrapper nuzio-search-wrapper--${size} ${
          fullWidth ? 'nuzio-search-wrapper--full' : ''
        } ${className}`}
      >
        <Search size={18} className="nuzio-search-icon" aria-hidden="true" />

        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          className="nuzio-search-input"
          {...rest}
        />

        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="nuzio-search-clear"
            aria-label="Clear search query"
          >
            <X size={15} />
          </button>
        )}

        {shortcutKey && !currentValue && (
          <kbd className="nuzio-search-kbd" title={`Shortcut: ${shortcutKey}`}>
            {shortcutKey}
          </kbd>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
export default SearchInput;
