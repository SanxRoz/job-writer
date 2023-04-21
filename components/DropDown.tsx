import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type VibeType =
  | "Choose the industry do you work in"
  | "Accounting"
  | "Admin & Office Support"
  | "Advertising, Arts & Media"
  | "Banking & Financial Services"
  | "Call Centre & Customer Service"
  | "CEO & General Management"
  | "Community Services & Development"
  | "Construction"
  | "Consutling & Strategy"
  | "Design & Architecture"
  | "Education & Training"
  | "Engineering"
  | "Farming, Animals & Conservation"
  | "Government & Defence"
  | "Healthcare & Medical"
  | "Hospitality & Tourism"
  | "Human Resources & Recruitment"
  | "Information & Communication Technology"
  | "Insurance & Pensions"
  | "Legal"
  | "Manufactoring, Transport & Logistics"
  | "Marketing & Communications"
  | "Mining, Resources & Energy"
  | "Real Estate & Property"
  | "Retail & Consumer Products"
  | "Sales"
  | "Science & Technology"
  | "Sport & Recreation"
  | "Trades & Services";

interface DropDownProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
}

let vibes: VibeType[] = [
  "Choose the industry do you work in",
  "Accounting",
  "Admin & Office Support",
  "Advertising, Arts & Media",
  "Banking & Financial Services",
  "Call Centre & Customer Service",
  "CEO & General Management",
  "Community Services & Development",
  "Construction",
  "Consutling & Strategy",
  "Design & Architecture",
  "Education & Training",
  "Engineering",
  "Farming, Animals & Conservation",
  "Government & Defence",
  "Healthcare & Medical",
  "Hospitality & Tourism",
  "Human Resources & Recruitment",
  "Information & Communication Technology",
  "Insurance & Pensions",
  "Legal",
  "Manufactoring, Transport & Logistics",
  "Marketing & Communications",
  "Mining, Resources & Energy",
  "Real Estate & Property",
  "Retail & Consumer Products",
  "Sales",
  "Science & Technology",
  "Sport & Recreation",
  "Trades & Services",
];
export default function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="focus:ring-[#2378d1] focus:ring-4 inline-flex w-full justify-between items-center rounded-md border-0 bg-back min-h-[2.75rem] px-4 py-2 text-ctext shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
          {vibe}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute max-h-[15rem] bg-back overflow-auto left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:ring-[#2378d1] focus:outline-none focus:ring-4"
          key={vibe}
        >
          <div className="">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setVibe(vibeItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-ctext" : "text-ctext",
                      vibe === vibeItem ? "bg-gray-200" : "",
                      "px-4 hover:bg-[#333] py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{vibeItem}</span>
                    {vibe === vibeItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
