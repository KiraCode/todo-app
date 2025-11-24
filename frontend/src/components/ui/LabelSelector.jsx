import { LucideTag, TagIcon, XCircle } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import getLabelsAPI from "../../api/getLabelsAPI.js";
import updateLabelsAPI from "../../api/updateLabelsAPI.js";
import toast from "react-hot-toast";

const LabelSelector = ({
  task,
  selectedLabels,
  setSelectedLabels,
  placeholder = "Type a Label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [matchingLabels, setMatchingLabels] = useState([]);
  const dropdownRef = useRef(null);
  const taskId = task._id;

  const toggleSelector = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  //   handle labels which are not repeated again, while assigning into a new task
  const handleSetMatchingLabels = useCallback(
    (matchingLabelsToSet) => {
      const filteredLabels = matchingLabelsToSet.filter(
        (label) => !selectedLabels.includes(label)
      );
      setMatchingLabels(filteredLabels);
    },
    [selectedLabels]
  );

  const handleGetLabelResponse = useCallback(
    (responseData) => {
      setLabels(responseData.labels);
      handleSetMatchingLabels(responseData.labels);
    },
    [handleSetMatchingLabels]
  );

  //   common error handle
  const handleError = useCallback((errorMsg) => {
    console.error(errorMsg);
    toast.error(errorMsg);
    setIsOpen(false);
  }, []);

  const handleUpdateResponse = useCallback(() => {
    // fetch all labels again after updating active task in backend. labels are selected
    // again if linked to another task
    getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  //   fetch all updated labels => useEffect
  useEffect(() => {
    if (isOpen) getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  //   update label useeffect
  useEffect(() => {
    updateLabelsAPI(selectedLabels, taskId, handleUpdateResponse, handleError);
  }, [selectedLabels, taskId, handleUpdateResponse, handleError]);

  //   clicking outisde the label => close the drop down
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      setSearchInput(inputValue);

      const matching = labels.filter((label) => label.toLowerCase());
      handleSetMatchingLabels(matching);
    },
    [handleSetMatchingLabels, labels]
  );

  const handleLabelSelect = useCallback(
    (label) => {
      // check is labels is already selected
      if (!selectedLabels.includes(label)) {
        setSelectedLabels((prevSelectedLabels) => [
          ...prevSelectedLabels,
          label,
        ]);
      }
      // updateLabelsAPI(updated, taskId, handleUpdateResponse, handleError);
    },
    [handleSetMatchingLabels, selectedLabels, setSelectedLabels]
  );

  const handleLabelDeselect = useCallback(
    (label) => {
      setSelectedLabels((prevSelectedLabels) =>
        prevSelectedLabels.filter((item) => item !== label)
      );
      setSearchInput("");
      handleSetMatchingLabels([]);
      // updateLabelsAPI(updated, taskId, handleUpdateResponse, handleError);
    },
    [handleSetMatchingLabels, setSelectedLabels]
  );

  const handleCreateLabel = useCallback(() => {
    const newLabel = searchInput.trim();
    if (newLabel !== "" && !labels.includes(newLabel)) {
      setSelectedLabels((prevSelectedLabels) => [
        ...prevSelectedLabels,
        newLabel,
      ]);
    }
  }, [handleSetMatchingLabels, labels, searchInput, setSelectedLabels]);

  const isTyping = useMemo(
    () => Boolean(searchInput.trim().length),
    [searchInput]
  );
  return (
    <div className="label-selector-container" ref={dropdownRef}>
      <div
        className="view-task-info-box clickable flex"
        onClick={toggleSelector}
      >
        <TagIcon />
        <p className="label-12">Labels</p>
      </div>
      {isOpen && (
        <div className="label-selector label-12">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
          <div className="labels-list-overflow">
            {!isTyping && (
              <ul className="selected-labels-list">
                {selectedLabels.map((label) => (
                  <li key={`${label}-selected`} className="selected-label">
                    <LucideTag />{label}
                    <button onClick={() => handleLabelDeselect(label)}>
                      <XCircle width={8} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <ul className="matching-label-list">
              {matchingLabels.map((label) => (
                <li
                  key={`${label}-listed`}
                  className="matching-label"
                  onClick={() => handleLabelSelect(label)}
                >
                  <LucideTag width={13} height={13} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          {isTyping && !labels.includes(searchInput) && (
            <button onClick={handleCreateLabel} className="create-label-btn">
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LabelSelector;
