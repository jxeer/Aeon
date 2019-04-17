import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const CreateAction = (props) => {
  return (
    <form onSubmit={props.makeAction}>
      <input type="text" name="name" value={props.newActionData.name}     onChange={props.handleActionChange} placeholder="Name"/>
      <input type="text" name="status" value={props.newActionData.status}     onChange={props.handleActionChange} placeholder="Status"/>
      <button onClick={props.makeAction}>Submit</button>
    </form>
  )
}

export default CreateAction;
