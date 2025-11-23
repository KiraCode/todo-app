import React, { useState } from "react";
import Modal from "./ui/Modal";
import StatusDropDown from "./ui/StatusDropDown";
import { DeleteTask } from "./ui/DeleteTask";
import moment from "moment";
import {
  AlarmCheckIcon,
  BrushIcon,
  PenBoxIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import CheckedBlue from "../assets/blue-checked.svg";
import LabelSelector from "./ui/LabelSelector";

const ViewTask = ({
  task,
  setActiveTaskId,
  fetchAllTasks,
  showEditTaskScreen,
  showTaskListScreen,
  changeTaskStatus,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(task?.labels || []);

  const handleEditTask = function () {
    setActiveTaskId(task._id);
    showEditTaskScreen();
  };

  const openDeleteTaskPopup = () => setShowDeleteTaskPopup(true);
  const closeDeleteTaskPopup = () => setShowDeleteTaskPopup(false);
  return (
    <Modal isOpen={true} onClose={showTaskListScreen}>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={CheckedBlue} className="task-icon" alt="task icon" />
          </span>
          <h2 className="view-task-title">{task.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <StatusDropDown
            value={task.status}
            taskId={task._id}
            changeTaskStatus={changeTaskStatus}
          />
          <div className="close-modal-btn">
            <XIcon onClick={showTaskListScreen} />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="view-task-left-section">
          <pre className="view-task-description">{task?.description}</pre>
          {selectedLabels.length ? (
            <span className="labels-icon-wrapper">
              <TagIcon />
              <span className="labels-row">
                {selectedLabels.map((label) => (
                  <span key={`${task._id}-${label}`}>{label}</span>
                ))}
              </span>
            </span>
          ) : null}
        </div>
        <div className="view-task-right-section">
          {task.due_date && (
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex date-container">
                <AlarmCheckIcon />
                <p className="date-text">
                  {moment(task.due_date).format("DD MM YYYY")}
                </p>
              </div>
            </div>
          )}

          {/* label selector */}
          <LabelSelector
            task={task}
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
          />

          <div
            className="view-task-info-box flex clickable"
            onClick={handleEditTask}
          >
            <PenBoxIcon />
            <p className="label-12">Edit Task</p>
          </div>
          <div
            className="view-task-info-box flex clickable"
            onClick={openDeleteTaskPopup}
          >
            <BrushIcon />
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          task={task}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </Modal>
  );
};

export default ViewTask;
