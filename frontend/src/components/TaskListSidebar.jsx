import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import List from "../assets/list-view.svg";
import Board from "../assets/board.svg";
import CheckBox from "./ui/CheckBox";
import toast from "react-hot-toast";
import getLabelsAPI from "../api/getLabelsAPI.js";
import DropDownSortBy from "./ui/DropDownSortBy.jsx";
import fetchTaskAPI from "../api/fetchTask.js";

const statusOptions = [
  { display: "Open", value: "Open" },
  { display: "In-Progrss", value: "In-Progress" },
  { display: "Completed", value: "Completed" },
];

const sortOptions = [
  { label: "Date Added", value: "added_on" },
  { label: "Due Date", value: "due_date" },
];

const TaskListSidebar = ({ boardView, setBoardView, setTasks }) => {
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  //   fetch all tasks
  useEffect(() => {
    const handleResponse = (responseData) => {
      setLabels(responseData.labels);
    };

    const handleError = (errorMessage) => {
      toast.error("Failed to fetch labels");
      console.log(errorMessage);
    };

    getLabelsAPI(handleResponse, handleError);
  }, []);

  const enableBoardView = useCallback(() => {
    setBoardView(true);
  }, [setBoardView]);

   const enableListView = useCallback(() => {
    setBoardView(false);
  }, [setBoardView]);

  const selectStatus = useCallback(function (statusToAdd) {
    setSelectedStatus((prevStatus) =>
      prevStatus.includes(statusToAdd)
        ? prevStatus
        : [...prevStatus, statusToAdd]
    );
  }, []);

  const removeStatus = useCallback(function (statusToRemove) {
    setSelectedStatus((selectStatus) =>
      selectStatus.filter((status) => status !== statusToRemove)
    );
  }, []);

  const selectLabels = useCallback(function (labelsToAdd) {
    setSelectedLabels((prevLabels) =>
      prevLabels.includes(labelsToAdd)
        ? prevLabels
        : [...prevLabels, labelsToAdd]
    );
  }, []);

  const removeLabels = useCallback(function (labelsToRemove) {
    setSelectedLabels((prevLabels) =>
      prevLabels.filter((label) => label !== labelsToRemove)
    );
  }, []);

  const handleStatusCheckbox = (e, value) => {
    if (e.target.checked) {
      selectStatus(value);
    } else {
      removeStatus(value);
    }
  };

  const handleLabelCheckBox = (e, value) => {
    if (e.taget.checked) {
      selectLabels(value);
    } else {
      removeLabels(value);
    }
  };

  const handleResponse = useCallback(
    (responseData) => setTasks(responseData.tasks),
    [setTasks]
  );

  const handleError = useCallback((errorMsg) => {
    console.error(errorMsg);
    toast("Something went Horrible!");
  }, []);

  // fetch tasks API based on selected options
  useEffect(() => {
    const options = { sortOption, selectLabels, selectStatus };
    fetchTaskAPI(handleResponse, handleError, options);
  }, [handleError, handleResponse, sortOption, selectedLabels, selectStatus]);

  return (
    <aside className="task-list-left-section">
      <div>
        <p className="left-section-label">View</p>
        <div className="view-toggle-container">
          {/* list view toggle */}
          <div
            className={clsx("view-toggle", !boardView && "active-toggle")}
            onClick={enableListView}
          >
            <img src={List} alt="List Icon" />
            <p className="list-label">List</p>
          </div>

          {/* board view toggle */}
          <div
            className={clsx("view-toggle", boardView && "active-toggle")}
            onClick={enableBoardView}
          >
            <img src={Board} alt="Board icon" />
            <p className="list-label">Board</p>
          </div>
        </div>
      </div>

      <div className="task-sidebar-child-section">
        <p className="left-section-label">Task Status</p>
        {/* render checkbox for each status option */}
        {statusOptions.map((status) => {
          const handleClick = (event) =>
            handleStatusCheckbox(event, status.value);
          return (
            <CheckBox
              kay={status.value + "-status"}
              label={status.display}
              onClick={handleClick}
            />
          );
        })}
      </div>
      {/* sort by section */}
      <div className="task-sidebar-child-section">
        <p className="left-section-label">Sort By</p>
        {/* dropdown for sorting options */}
        <DropDownSortBy
          placeholder="Select"
          value={sortOption}
          onChange={setSortOption}
          options={sortOptions}
        />
      </div>

      {/* filter by label */}
      <div className="task-sidebar-child-section">
        <p className="left-section-label">Label</p>
        {!labels.length && (
          <span className="no-label-text">No Label Created Yet</span>
        )}
        {/* render checkboxes for each label */}
        {labels.map((label) => {
          const handleClick = (event) => handleLabelCheckBox(event, label);
          return <CheckBox kay={label} label={label} onChick={handleClick} />;
        })}
      </div>
    </aside>
  );
};

export default TaskListSidebar;
