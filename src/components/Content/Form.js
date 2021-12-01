import React from "react";

const Form = (props) => {
  const handleChange = (e) => {
    props.handleCityChange(e.target.value);
  };

  return (
    <form onSubmit={props.onSubmit} className="d-grid gap-3">
      <div className="col-12">
        <label className="text-sm-start fw-light" htmlFor="city">
          Type name of city
        </label>
        <input
          onChange={handleChange}
          id="city"
          className="form-control"
          type="text"
          value={props.value}
          placeholder="Uzhhorod, Ukraine, Zakarpattia Oblast"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
