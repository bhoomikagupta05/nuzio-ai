import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import IconButton from './IconButton.jsx';

/**
 * Reusable Nuzio Modal / Dialog
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {React.ReactNode} [props.footer]
 * @param {boolean} [props.closeOnOverlayClick=true]
 * @param {string} [props.className='']
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'medium',
  footer,
  closeOnOverlayClick = true,
  className = '',
  children,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="nuzio-modal-portal">
      <div
        className="nuzio-modal-backdrop"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={`nuzio-modal-panel nuzio-modal-panel--${size} ${className}`}
      >
        {(title || onClose) && (
          <div className="nuzio-modal-header">
            <div>
              {title && <h3 id="modal-title" className="nuzio-modal-title">{title}</h3>}
              {subtitle && <p className="nuzio-modal-subtitle">{subtitle}</p>}
            </div>

            {onClose && (
              <IconButton
                ariaLabel="Close modal"
                variant="ghost"
                size="small"
                onClick={onClose}
              >
                <X size={18} />
              </IconButton>
            )}
          </div>
        )}

        <div className="nuzio-modal-body">{children}</div>

        {footer && <div className="nuzio-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
