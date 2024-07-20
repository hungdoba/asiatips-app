import { useState } from 'react';
import { MenuItem } from '@/types/common';

interface Props {
  menuItems: MenuItem[];
  onSelect: (value: string) => void;
  initValue?: string;
}

export default function Dropdown({ menuItems, onSelect, initValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonTextContent, setButtonTextContent] = useState(
    initValue
      ? menuItems.find((menu) => menu.value === initValue)?.label
      : menuItems[0].label
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    setIsOpen(false);
    setButtonTextContent(item.label);
    onSelect(item.value);
  };

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        id="dropdownDefaultButton"
        className="w-full justify-between text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdown"
      >
        {buttonTextContent}
        <svg
          className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="w-full absolute top-full left-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
