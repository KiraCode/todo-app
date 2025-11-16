import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import ArrowDown from "../../assets/arrow-down.svg";

const DropdownSortBy = ({ placeHolder, value, onChange, options }) => {
  // state to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // refernce to select the element
  const selectRef = useRef(null);

  const toggleMenuDisplay = useCallback(
    () => setIsMenuOpen((isMenuOpen) => !isMenuOpen),
    []
  );

  useEffect(() => {
    function handleClickOutisde(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutisde);
    return () => {
      document.addEventListener("mousedown", handleClickOutisde);
    };
  }, []);

  const handleOptionChange = useCallback(
    function (option) {
      onChange(option);
      setIsMenuOpen(false);
    },
    [onchange]
  );

  //   memoized selected options
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  
  return (
    <div className="dropdown-container">
      <div className="value-container" onClick={toggleMenuDisplay}>
        {/* display selected value or placeholder */}
        <span
          className={clsx("dropdown-value", !value && "dropdown-placeholder")}
        >
          {selectedOption?.label ?? placeHolder}
        </span>
        <img src={ArrowDown} alt="dropdown icon" />
      </div>
      {/* display sort options */}
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                className="menu-list-option"
                key={option.value + "-option"}
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

export default DropdownSortBy;
