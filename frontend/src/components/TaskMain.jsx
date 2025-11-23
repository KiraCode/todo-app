import React, { useCallback, useEffect, useState } from "react";
import NoTask from "./NoTask";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import Loading from "./ui/Loading";
import fetchTasksAPI from "../api/fetchTask.js";

const TaskMain = () => {
  // we manage current screen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");
  const [task, setTask] = useState([]);

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);

  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);

  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);

  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);

  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);

  // api handling
  const handleResponse = useCallback(function (responseData) {
    const extractedTasks = responseData.tasks;
    setTask(extractedTasks);
    if (extractedTasks.length) {
      showTaskListScreen();
    } else {
      showNoTaskScreen();
    }
  }, []);

  const handleError = useCallback((errorMessage) => {
    alert(errorMessage);
    console.log(errorMessage);
  }, []);

  const fetchAllTasks = useCallback(() => {
    fetchTasksAPI(handleResponse, handleError);
  }, [handleResponse, handleError]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);
  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currComponent === "taskList" && <TaskList />}
        {currComponent === "createTask" && (
          <CreateTask
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "viewTask" && <ViewTask />}
        {currComponent === "editTask" && <EditTask />}
      </div>
    </>
  );
};

export default TaskMain;
