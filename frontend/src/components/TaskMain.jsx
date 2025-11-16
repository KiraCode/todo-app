import React, { useCallback, useState } from "react";
import Loading from './ui/Loading'
import NoTask from './NoTask'
import TaskList from './TaskList'
import CreateTask from './CreateTask'
import ViewTask from './ViewTask'
import EditTask from './EditTask'

const TaskMain = () => {
  // we manage current acreen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);
  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);
  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);
  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);
  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);
  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="container-div">
        {currComponent === "noTask" && <NoTask />}
        {currComponent === "taskList" && <TaskList />}
        {currComponent === "createTask" && <CreateTask />}
        {currComponent === "viewtask" && <ViewTask />}
        {currComponent === "editTask" && <EditTask />}
      </div>
    </>
  );
};

export default TaskMain;
