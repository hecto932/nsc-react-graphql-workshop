import React from "react";

export const ListOfTasksComponent = props => {
  console.log(props);
  const {
    data: { getTasks = [], loading, error }
  } = props;

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Hubo un error</h2>;
  }

  return (
    <ul>
      {getTasks.map((task, index) => (
        <li key={index}>
          <input type="checkbox" defaultChecked={task.done} /> - {task.name}
        </li>
      ))}
    </ul>
  );
};
