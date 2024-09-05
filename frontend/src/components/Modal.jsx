import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document.querySelector('body'))
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      enableBodyScroll(document.querySelector('body'));
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscapePress);
    }
  }, [isOpen]);

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && modalRef.current.isSameNode(event.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={clsx(
        'fade-animation fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-full flex items-center justify-center',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="bg-transparent text-gray-400 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
