import React from 'react';

const Form = props => {
  const {managers, product, handleChange, handleSave} = props;
  return (
    <div className="form-group">
      <label htmlFor="managerId">
        <em>Product Manager</em>
      </label>
      <select
        name="managerId"
        value={product.user ? product.user.id : 'none'}
        onChange={event => {
          event.preventDefault();
          handleChange(event, product.id);
        }}
        className="form-control"
        style={{marginBottom: '10px', marginTop: '10px'}}
      >
        <option value="none">-- None --</option>
        {managers.map(manager => (
          <option key={manager.id} value={manager.id}>
            {manager.name}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary"
        onClick={event => {
          event.preventDefault();
          handleSave();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
