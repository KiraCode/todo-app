import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import ArrowDown from "../../assets/arrow-down.svg";

const DropDownSortBy = ({ placeholder, value, onChange, options }) => {
  // state to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // reference to select the element
  const selectRef = useRef(null);

  const toggleMenuDisplay = useCallback(
    () => setIsMenuOpen((isMenuOpem) => !isMenuOpem),
    []
  );

  //   close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  });
  const handleOptionChange = useCallback(
    function (option) {
      onChange(option);
      setIsMenuOpen(false);
    },
    [onChange]
  );

  // memoized selected options
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  return (
    <div ref={selectRef} className="dropdown-container">
      <div className="value-container" onClick={toggleMenuDisplay}>
        {/* display selected value or placeholder */}
        <span
          className={clsx("dropdown-value", !value && "dropdown-placeholder")}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <img src={ArrowDown} alt="Dropdown icon" />
      </div>

      {/* display sort options */}
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                key={option.value + "-option"}
                className="menu-list-option"
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownSortBy;
