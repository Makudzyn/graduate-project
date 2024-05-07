import { Disclosure, Transition } from "@headlessui/react";
import ChevronIcon from "../../assets/chevron.svg?react";

interface AccordionItemProps {
  title: string;
  description: string;
}

const AccordionItem = ({ title, description }: AccordionItemProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`${open ? "shadow-white/75 shadow-md" : "hover:shadow-purpleFirst/75 hover:shadow-md"}
              flex w-full w-max-screen-lg justify-between rounded-lg p-6 text-left text-base transition-shadow font-medium text-gray-50
              focus:outline-none focus-visible:ring focus-visible:ring-purpleFirst/75`}
          >
            <h4>{title}</h4>
            <ChevronIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-6 w-6 stroke-gray-50 transition-transform`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel
              className="px-6 pb-5 pt-4 text-sm+ text-secondary max-w-screen-lg"
              static
            >
              {description}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AccordionItem;
