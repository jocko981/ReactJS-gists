import React from 'react';
import { connect } from 'react-redux';
import { fetchPeopleAction } from '../actions';

const mapCompaniesIntoPeople = (people, companies) => {
  /* Map Company names into each person that they work for */
};

const mapPeopleIntoHouses = (houses, people) => {
  /* Map people into house who live in the house */
};

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPeople()
  }

  render() {
    //// this.props.fetchPeople()
    return (
      <div className="main">
        <People data={this.props.people} />
        <House data={this.props.houses} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { people: { data }, companies, houses } = state;
  const people = mapCompaniesIntoPeople(data, companies);
  //// const houses = mapPeopleIntoHouses(houses, data)
  const housesWithPeople = mapPeopleIntoHouses(houses, data)
  return {
    people,
    //// houses,
    houses: housesWithPeople,
  };
};

const mapDispatchToProps = dispatch => ({
  //// fetchPeople: () => dispatch(fetchPeople())
  fetchPeople: () => dispatch(fetchPeopleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);