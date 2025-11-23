import React, { useCallback, useState } from "react";

const TaskMain = () => {
  // we manage current screen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");

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

  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="container-div">
        {currComponent === "noTask" && <NoTask />}
        {currComponent === "taskList" && <TaskList />}
        {currComponent === "createTask" && <CreateTask />}
        {currComponent === "viewTask" && <ViewTask />}
        {currComponent === "editTask" && <EditTask />}
      </div>
    </>
  );
};

export default TaskMain;
