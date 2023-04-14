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
  | "Afghanistan"
  | "Aland Islands"
  | "Albania"
  | "Algeria"
  | "American Samoa"
  | "Andorra"
  | "Angola"
  | "Anguilla"
  | "Antarctica"
  | "Antigua and Barbuda"
  | "Argentina"
  | "Armenia"
  | "Aruba"
  | "Australia"
  | "Austria"
  | "Azerbaijan"
  | "Bahamas"
  | "Bahrain"
  | "Bangladesh"
  | "Barbados"
  | "Belarus"
  | "Belgium"
  | "Belize"
  | "Benin"
  | "Bermuda"
  | "Bhutan"
  | "Bolivia, Plurinational State of"
  | "Bonaire, Sint Eustatius and Saba"
  | "Bosnia and Herzegovina"
  | "Botswana"
  | "Bouvet Island"
  | "Brazil"
  | "British Indian Ocean Territory"
  | "Brunei Darussalam"
  | "Bulgaria"
  | "Burkina Faso"
  | "Burundi"
  | "Cambodia"
  | "Cameroon"
  | "Canada"
  | "Cape Verde"
  | "Cayman Islands"
  | "Central African Republic"
  | "Chad"
  | "Chile"
  | "China"
  | "Christmas Island"
  | "Cocos (Keeling) Islands"
  | "Colombia"
  | "Comoros"
  | "Congo"
  | "Congo, The Democratic Republic of the"
  | "Cook Islands"
  | "Costa Rica"
  | "Côte d'Ivoire"
  | "Croatia"
  | "Cuba"
  | "Curaçao"
  | "Cyprus"
  | "Czech Republic"
  | "Denmark"
  | "Djibouti"
  | "Dominica"
  | "Dominican Republic"
  | "Ecuador"
  | "Egypt"
  | "El Salvador"
  | "Equatorial Guinea"
  | "Eritrea"
  | "Estonia"
  | "Ethiopia"
  | "Falkland Islands (Malvinas)"
  | "Faroe Islands"
  | "Fiji"
  | "Finland"
  | "France"
  | "French Guiana"
  | "French Polynesia"
  | "French Southern Territories"
  | "Gabon"
  | "Gambia"
  | "Georgia"
  | "Germany"
  | "Ghana"
  | "Gibraltar"
  | "Greece"
  | "Greenland"
  | "Grenada"
  | "Guadeloupe"
  | "Guam"
  | "Guatemala"
  | "Guernsey"
  | "Guinea"
  | "Guinea-Bissau"
  | "Guyana"
  | "Haiti"
  | "Heard Island and McDonald Islands"
  | "Holy See (Vatican City State)"
  | "Honduras"
  | "Hong Kong"
  | "Hungary"
  | "Iceland"
  | "India"
  | "Indonesia"
  | "Iran, Islamic Republic of"
  | "Iraq"
  | "Ireland"
  | "Isle of Man"
  | "Israel"
  | "Italy"
  | "Jamaica"
  | "Japan"
  | "Jersey"
  | "Jordan"
  | "Kazakhstan"
  | "Kenya"
  | "Kiribati"
  | "Korea, Democratic People's Republic of"
  | "Korea, Republic of"
  | "Kuwait"
  | "Kyrgyzstan"
  | "Lao People's Democratic Republic"
  | "Latvia"
  | "Lebanon"
  | "Lesotho"
  | "Liberia"
  | "Libya"
  | "Liechtenstein"
  | "Lithuania"
  | "Luxembourg"
  | "Macao"
  | "Macedonia, Republic of"
  | "Madagascar"
  | "Malawi"
  | "Malaysia"
  | "Maldives"
  | "Mali"
  | "Malta"
  | "Marshall Islands"
  | "Martinique"
  | "Mauritania"
  | "Mauritius"
  | "Mayotte"
  | "Mexico"
  | "Micronesia, Federated States of"
  | "Moldova, Republic of"
  | "Monaco"
  | "Mongolia"
  | "Montenegro"
  | "Montserrat"
  | "Morocco"
  | "Mozambique"
  | "Myanmar"
  | "Namibia"
  | "Nauru"
  | "Nepal"
  | "Netherlands"
  | "New Caledonia"
  | "New Zealand"
  | "Nicaragua"
  | "Niger"
  | "Nigeria"
  | "Niue"
  | "Norfolk Island"
  | "Northern Mariana Islands"
  | "Norway"
  | "Oman"
  | "Pakistan"
  | "Palau"
  | "Palestinian Territory, Occupied"
  | "Panama"
  | "Papua New Guinea"
  | "Paraguay"
  | "Peru"
  | "Philippines"
  | "Pitcairn"
  | "Poland"
  | "Portugal"
  | "Puerto Rico"
  | "Qatar"
  | "Réunion"
  | "Romania"
  | "Russian Federation"
  | "Rwanda"
  | "Saint Barthélemy"
  | "Saint Helena, Ascension and Tristan da Cunha"
  | "Saint Kitts and Nevis"
  | "Saint Lucia"
  | "Saint Martin (French part)"
  | "Saint Pierre and Miquelon"
  | "Saint Vincent and the Grenadines"
  | "Samoa"
  | "San Marino"
  | "Sao Tome and Principe"
  | "Saudi Arabia"
  | "Senegal"
  | "Serbia"
  | "Seychelles"
  | "Sierra Leone"
  | "Singapore"
  | "Sint Maarten (Dutch part)"
  | "Slovakia"
  | "Slovenia"
  | "Solomon Islands"
  | "Somalia"
  | "South Africa"
  | "South Georgia and the South Sandwich Islands"
  | "Spain"
  | "Sri Lanka"
  | "Sudan"
  | "Suriname"
  | "South Sudan"
  | "Svalbard and Jan Mayen"
  | "Swaziland"
  | "Sweden"
  | "Switzerland"
  | "Syrian Arab Republic"
  | "Taiwan, Province of China"
  | "Tajikistan"
  | "Tanzania, United Republic of"
  | "Thailand"
  | "Timor-Leste"
  | "Togo"
  | "Tokelau"
  | "Tonga"
  | "Trinidad and Tobago"
  | "Tunisia"
  | "Turkey"
  | "Turkmenistan"
  | "Turks and Caicos Islands"
  | "Tuvalu"
  | "Uganda"
  | "Ukraine"
  | "United Arab Emirates"
  | "United Kingdom"
  | "United States"
  | "United States Minor Outlying Islands"
  | "Uruguay"
  | "Uzbekistan"
  | "Vanuatu"
  | "Venezuela, Bolivarian Republic of"
  | "Viet Nam"
  | "Virgin Islands, British"
  | "Virgin Islands, U.S."
  | "Wallis and Futuna"
  | "Yemen"
  | "Zambia"
  | "Zimbabwe";

interface DropDownProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
}

let vibes: VibeType[] = [
  "Afghanistan",
  "Aland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia, Plurinational State of",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, The Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory, Occupied",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "South Sudan",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela, Bolivarian Republic of",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
export default function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="focus:ring-[#f4ebff] focus:ring-4 inline-flex w-full justify-between items-center rounded-md border-0 bg-back min-h-[2.75rem] px-4 py-2 text-ctext shadow-sm focus:outline-none focus:ring-2 focus:ring-black">
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
          className="absolute max-h-[15rem] bg-back overflow-auto left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
