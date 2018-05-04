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

const Table = styled.table`
  width: 300px;
  text-align: center;
  padding-top: 20px;
  margin: 0 auto;
`;

class App extends Component {
  //add value on initialization moment
  constructor(props){
    super(props);

    let storageState = localStorage.getItem('state');
    let initState;

    if(storageState != null){
      storageState = JSON.parse(storageState);
      initState = {...storageState, date: moment(storageState.date)};
    } else {
      initState = {
        date: moment(),
        navSelected: 'incomes',
        transactions: [],
      };
    }

    this.state = initState;

    this.state = {
      date: moment(),
      navSelected: 'expanse',
      transactions: [],
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

  handleSubmiteTransaction = (sum, category) => {

    // come after click Enter in Expanse
    const {date: TodayDate, transactions} = this.state;

    //create new transaction
    const newTransaction = {
      date: TodayDate.format('DD.MM.YYYY'),
      category: category,
      sum: sum,
    };

    const newTransactions = [...transactions, newTransaction];

    newTransactions.sort((a,b) => {
      const aDate = moment(a.date, 'DD.MM.YYYY');
      const bDate = moment(b.date, 'DD.MM.YYYY');
      return aDate.isAfter(bDate);
    })

    this.setState({transactions: newTransactions});
  }

  componentDidUpdate(){
    const {date} = this.state;
    localStorage.setItem('state', JSON.stringify({...this.stete, date: date.format()}));
  }

  onToday = () => {
    const {transactions, date} = this.state;

    const currentMonthTransactions = transactions.filter(
      ({date: transactionDate}) =>
        moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month'),
    );

    const dailyMoney =
      currentMonthTransactions.reduce(
        (acc, transaction) =>
          transaction.sum > 0 ? transaction.sum + acc : acc,
        0,
      ) / moment(date).daysInMonth();

    const transactionsBeforeThisDayAndInThisDay = currentMonthTransactions.filter(
      ({date: transactionDate}) =>
        moment(transactionDate, 'DD.MM.YYYY').isBefore(
          date,
          'date',
        ) ||
        moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'date'),
    );

    const expanseBeforeToday = transactionsBeforeThisDayAndInThisDay.reduce(
      (acc, {sum}) => (sum < 0 ? acc + sum : acc),
      0,
    );

    const incomeBeforeToday = date.date() * dailyMoney;

    console.log({dailyMoney, expanseBeforeToday, incomeBeforeToday});

    return (
      (incomeBeforeToday + expanseBeforeToday).toFixed(2)
    )
  };

  render() {

    const {date, navSelected, transactions} = this.state;

    return (
        <section>
          <header>
            <h1>My Finance App</h1>
            <div className='date__wrapper'>
              <DateButton onClick={this.handleSubtractDay} className='date__button'>{'\u25C4'}</DateButton>
              <p className='date__curent'>{date.format('DD.MM.YYYY')}</p>
              <DateButton onClick={this.handleAddDay} className='date__button'>{'\u25BA'}</DateButton>
            </div>
            <p>For today: {this.onToday()} zl</p>
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

            {navSelected === 'expanse' ? (
              <Expanse onSubmite={this.handleSubmiteTransaction} />
            ) : (
              <Incomes onSubmite={this.handleSubmiteTransaction} />
            )}
            

            <Table>
              <tbody>
                {transactions
                  .filter(({date: transactionDate}) => 
                    moment(transactionDate, 'DD.MM.YYYY').isSame(
                      date,
                      'month',
                    ),
                  )
                  .map(({date, sum, category}, index) => (
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{sum} zl</td>
                      <td>{category}</td>
                   </tr>
                ))
              }
              </tbody>
            </Table>
          </main>
        </section>
      );
  }
}

export default App;
