import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }



  renderValues() {
    const entries = [];

    
    for (let key of this.state.seenIndexes.map(({ number }) => number)) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }


  renderHistory() {
    const entries= [];
    await this.fetchValues();
    await this.fetchIndexes();
    return (
      <div>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}

        Oto Strona z dokumentacja!<br/>
        <Link to="/fib">Schowaj</Link>

      </div>
    );
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <from onSubmit={this.renderHistory}>
          <button>History</button>
        </from>

        Oto Strona z dokumentacja!<br/>
        <Link to="/">Wroc, jesli chcesz?!</Link>
        
      </div>
    );
  }
}

export default Fib;
