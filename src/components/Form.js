import React from 'react';

const Form = props => {
  const {managers, product, handleChange, handleSave, selectedManagers} = props;
  const findProduct = selectedManagers.find(
    changedProduct => changedProduct.id === product.id
  );
  const disabled = product.userId === findProduct.userId;
  return (
    <div className="form-group">
      <label htmlFor="managerId">
        <em>Product Manager</em>
      </label>
      <select
        name="managerId"
        value={findProduct.user ? findProduct.user.id : 'none'}
        onChange={event => {
          event.preventDefault();
          handleChange(event, product.id);
        }}
        className="form-control"
        style={{marginBottom: '10px', marginTop: '10px'}}
      >
        <option value='000'>-- None --</option>
        {managers.map(manager => (
          <option key={manager.id} value={manager.id}>
            {manager.name}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary"
        disabled={disabled}
        onClick={event => {
          event.preventDefault();
          handleSave(product.id);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
