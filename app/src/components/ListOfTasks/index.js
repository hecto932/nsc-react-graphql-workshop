import React from "react";

export const ListOfTasksComponent = ({ data: { getTasks = [] } }) => {
  return (
    <ul>
      {getTasks.map((task, index) => (
        <li key={index}>
          <input type="checkbox" value={task.done} /> - {task.name}
        </li>
      ))}
    </ul>
  );
};
