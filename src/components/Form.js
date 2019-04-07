import React from 'react';

const Form = props => {
  const {managers} = props;
  return (
    <div className="form-group">
      <lavel for="managerId">
        <em>Product Manager</em>
      </lavel>
      <select
        name="managerId"
        class="form-control"
        style={{marginBottom: '10px', marginTop: '10px'}}
      >
        <option>-- None --</option>
        {managers.map(manager => (
          <option key={manager.id} value={manager.id}>
            {manager.name}
          </option>
        ))}
      </select>
      <button className="btn btn-primary">Save</button>
    </div>
  );
};

export default Form;
