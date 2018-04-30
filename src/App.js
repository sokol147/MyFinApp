import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';


//css in js with styled-components
const DateButton = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 20px;
  font-size: 20px;
  outline: none;
`;

class App extends Component {
  //add value on initialization moment
  constructor(props){
    super(props);

    this.state = {
      date: moment()
    };
  }

  handleSubtractDay = () => {
    this.setState({date: this.state.date.subtract(1, 'day')});
  };
  handleAddDay = () => {
    this.setState({date: this.state.date.add(1, 'day')});
  };

  render() {

    const {date} = this.state;

    return (
        <section>
          <header>
            <h1>My Finance App</h1>
            <div className='date__wrapper'>
              <DateButton onClick={this.handleSubtractDay} className='date__button'>{'\u25C4'}</DateButton>
              <p className='date__curent'>{date.format('DD.MM.YYYY')}</p>
              <DateButton onClick={this.handleAddDay} className='date__button'>{'\u25BA'}</DateButton>
            </div>
          </header>
        </section>
      );
  }
}

export default App;
