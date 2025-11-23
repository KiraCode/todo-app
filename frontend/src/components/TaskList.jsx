import React, { useCallback, useMemo, useState } from "react";
import TaskListSidebar from "./TaskListSidebar";
import FolderImg from "../assets/folder.svg";
import clsx from "clsx";
import SearchTasks from "./ui/SearchTasks";
import TaskTile from "./TaskTile";

const TaskList = ({
  tasks,
  fetchAllTasks,
  showViewTaskScreen,
  showEditTaskScreen,
  setActiveTaskId,
  setTasks,
  changeTaskStatus,
  boardView,
  setBoardView,
  showCreateTaskScreen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);

  const showSearchResults = useMemo(
    () => Boolean(searchQuery.trim().length),
    []
  );
  const handleViewTask = useCallback((taskId) => {
    setActiveTaskId(taskId);
    showViewTaskScreen();
  }, []);
  return (
    <div className="task-list-screen content-section">
      {/* left sidebar */}
      <div className="task-list-left-container">
        <p className="task-heading">🔥 Task</p>
        {/* task sidebar */}
        <TaskListSidebar
          boardView={boardView}
          setBoardView={setBoardView}
          setTasks={setTasks}
        />
      </div>
      {/* right sidebar */}
      <div className="task-list-right-container">
        {/* header with search and add task button */}
        <div className="task-list-right-header">
          {/* search tasks component */}
          <SearchTasks
            placeholder="Search title and description"
            tasks={tasks}
            setFilteredTask={setFilteredTask}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* button to add new task */}
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={FolderImg} alt="Add task icon" />
            Add New Task
          </button>
        </div>

        {/* task list section */}
        <div
          className={clsx("task-list-right-section", boardView && "board-view")}
        >
          {/* if user has searched anything, show search results; 
          otherwise show tasks based on sidebar options */}

          {(showSearchResults ? filteredTask : tasks).map((task) => (
            <TaskTile
              key={`${task._id}-${
                showSearchResults ? "result-tile" : "task-tile"
              }`}
              task={task}
              onClick={() => handleViewTask(task._id)}
              fetchAllTasks={fetchAllTasks}
              changeTaskStatus={changeTaskStatus}
              setActiveTaskId={setActiveTaskId}
              showEditTaskScreen={showEditTaskScreen}
              boardView={boardView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
