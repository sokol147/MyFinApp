import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import Expanse from './Expanse';
import Incomes from './Incomes';


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

const Link = styled.span`
  cursor: pointer;
  color: white;
  margin: 0 8px;
  border-bottom: ${({selected}) => (selected ? '2px solid white' : 'none')};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 16px;
  padding: 20px 0 15px;
`;

class App extends Component {
  //add value on initialization moment
  constructor(props){
    super(props);

    this.state = {
      date: moment(),
      navSelected: 'expanse'
    };
  }

  handleSubtractDay = () => {
    this.setState({date: this.state.date.subtract(1, 'day')});
  };
  handleAddDay = () => {
    this.setState({date: this.state.date.add(1, 'day')});
  };
  handleNavClick = (event) => {
    this.setState({navSelected: event.target.getAttribute('name')});
  }

  render() {

    const {date, navSelected} = this.state;

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
          <main>
            <Nav>
              <Link name='expanse' onClick={this.handleNavClick}
                selected={navSelected === 'expanse'}>Expanse today
              </Link>
              <Link name='incomes' onClick={this.handleNavClick}
                selected={navSelected === 'incomes'}>Incomes
              </Link>
            </Nav>

            {navSelected === 'expanse' ? <Expanse/> : <Incomes/>}

          </main>
        </section>
      );
  }
}

export default App;
