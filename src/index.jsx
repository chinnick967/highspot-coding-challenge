import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Filters from './components/filters';
import Grid from './components/grid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
    };
    this.updateFilters = this.updateFilters.bind(this);
  }

  updateFilters(filters) {
    this.setState({ filters });
  }

  render() {
    const { filters } = this.state;
    return (
      <main>
        <Filters filters={filters} updateFilters={this.updateFilters} />
        <Grid filters={filters} />
      </main>
    );
  }
}

export default App;

const wrapper = document.getElementById('root');
ReactDOM.render(<App />, wrapper);
