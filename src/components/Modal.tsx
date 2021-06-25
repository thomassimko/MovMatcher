import React, { FC, useRef } from 'react';
import { CloseRounded } from '@material-ui/icons';

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
                <button
                  type="button"
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-20 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <CloseRounded />
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  {closeButtonText || 'Close'}
                </button>
                {showSubmitButton && (
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => submitAndCloseModal()}
                  >
                    {submitButtonText}
                  </button>
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
