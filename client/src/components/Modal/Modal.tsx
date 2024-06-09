import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import WarningIcon from "../../assets/svgs/warning.svg?react";
import CheckIcon from "../../assets/svgs/success.svg?react";
import CloseIcon from "../../assets/svgs/error.svg?react";

type ModalType = "warning" | "success" | "error";

interface ModalProps {
  message: string;
  setError: Dispatch<SetStateAction<string | null>>;
  type: ModalType;
}

const Modal = ({ message, setError, type }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalFields, setModalFields] = useState({
    title: "",
    iconComponent: <Fragment />,
  });

  useEffect(() => {
    switch (type) {
      case "warning":
        setModalFields({
          title: "Увага!",
          iconComponent: (
            <WarningIcon className={"stroke-gray-50 fill-yellow-500"} />
          ),
        });
        break;
      case "success":
        setModalFields({
          title: "Успішно виконано.",
          iconComponent: (
            <CheckIcon className={"stroke-gray-50 fill-green-600"} />
          ),
        });
        break;
      case "error":
        setModalFields({
          title: "Ой... щось пішло не так!",
          iconComponent: (
            <CloseIcon className={"stroke-gray-50 fill-red-600"} />
          ),
        });
        break;
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center"
    >
      <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden={true} />

        <div className="rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purpleFirst sm:mx-0 sm:h-10 sm:w-10">
                {modalFields.iconComponent}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-100"
                >
                  {modalFields.title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purpleFirst text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
