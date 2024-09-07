import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

let timerIn = undefined;
let timerOut = undefined;

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    clearTimeout(timerOut);
    clearTimeout(timerIn);
    if (isOpen) {
      disableBodyScroll(document.querySelector('body'))
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleEscapePress);
      // leave only fadeIn effect
      clearTimeout(timerOut);
      modalRef.current.classList.remove('animate-fadeOut');
      modalRef.current.classList.add('animate-fadeIn');
      timerIn = setTimeout(() => {
        modalRef.current.classList.remove("hidden");
        modalRef.current.classList.add("flex");
      },0)
    } else {
      enableBodyScroll(document.querySelector('body'));
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscapePress);
      // leave only fadeOut effect
      clearTimeout(timerIn);
      modalRef.current.classList.remove('animate-fadeIn');
      modalRef.current.classList.add('animate-fadeOut');
      timerOut = setTimeout(() => {
        modalRef.current.classList.remove("flex");
        modalRef.current.classList.add("hidden");
      },300)
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
      className="hidden fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-full items-center justify-center"
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
