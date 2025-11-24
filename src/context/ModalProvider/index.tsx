import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import ConfirmationModal from './../../common/confirm'

interface ModalContextType {
  showModal: (message: string, successCallback: () => void) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [callback, setCallback] = useState<(() => void) | null>(null);

  const showModal = (message: string, successCallback: () => void) => {
    setMessage(message);
    setCallback(() => successCallback);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isVisible && (
        <ConfirmationModal
          message={message}
          confirmCallback={callback!}
          onClose={hideModal}
        />
      )}
    </ModalContext.Provider>
  );
};
