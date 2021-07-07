import React, { FC } from 'react';
import { CloseRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Button } from './Button';

export interface IModalProps {
  button: JSX.Element;
  modalTitle: string;
  closeButtonText?: string;
  showSubmitButton?: boolean;
  submitButtonText?: string;
  onSubmit?: () => void;
}

export const Modal: FC<IModalProps> = ({
  button,
  modalTitle,
  closeButtonText,
  showSubmitButton,
  submitButtonText,
  onSubmit,
  children,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const submitAndCloseModal = () => {
    onSubmit();
    setShowModal(false);
  };

  const openModalButtonWithRefs = React.cloneElement(button, {
    onClick: () => setShowModal(true),
  });

  return (
    <>
      {openModalButtonWithRefs}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className="relative m-auto overflow-y-scroll
            border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              style={{ maxHeight: '80%', maxWidth: '80%' }}
            >
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                <IconButton
                  size="small"
                  className="opacity-40 hover:opacity-60"
                  onClick={() => setShowModal(false)}
                >
                  <CloseRounded />
                </IconButton>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <Button variant="outlined" onClick={() => setShowModal(false)}>
                  {closeButtonText || 'Close'}
                </Button>
                {showSubmitButton && (
                  <Button onClick={() => submitAndCloseModal()}>
                    {submitButtonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};
