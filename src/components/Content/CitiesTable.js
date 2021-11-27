import React from "react";

const CitiesTable = (props) => {
  const { cities, city, handleWeaterDataChange } = props;

  const handleCityDataDisplay = (value) => {
    handleWeaterDataChange(value);
  };

  let output;
  if (!cities && !city) {
    output = null;
    return;
  }
  output = cities.map((city, index) => (
    <tr onClick={() => handleCityDataDisplay(city)} key={city.id}>
      <th scope="row">{index + 1}</th>
      <td>{city.formatted}</td>
      <td>{city.continent}</td>
      <td>{city.country}</td>
      <td>{city.district}</td>
      <td>{city.flag}</td>
      <td>{city.state}</td>
      <td>{city.type.charAt(0).toUpperCase() + city.type.slice(1)}</td>
      <td>{city[city.type]}</td>
    </tr>
  ));
  return (
    <React.Fragment>
      <h4 className="pt-3 text-center">
        Choose from the <mark>list</mark>
      </h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Formatted Name</th>
            <th scope="col">Continent</th>
            <th scope="col">Country</th>
            <th scope="col">District</th>
            <th scope="col">Flag</th>
            <th scope="col">State</th>
            <th scope="col">Type</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{output}</tbody>
      </table>
    </React.Fragment>
  );
};

export default CitiesTable;
