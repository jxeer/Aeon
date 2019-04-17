import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const ActionList = (props) => {
  const {actions} = props
  return (
    <div className = "ActionList">
      { actions && actions.map(action => (
        <div key={action.id}>
          <p>{action.name}</p>
          <p>{action.status}</p>
          <br/>
        </div>
      ))}
    </div>
  );
};


export default ActionList;
