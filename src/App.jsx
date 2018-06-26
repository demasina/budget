import React, { Component } from 'react';
import Expanse from './Expanse.jsx';
import Incomes from './Incomes.jsx';
import moment from 'moment';
import styled from 'styled-components';


class App extends Component {
  constructor(props) {
    super(props);

    let storageState = localStorage.getItem('state');
    let initState;

    if(storageState != null) {
      storageState = JSON.parse(storageState);
      initState = {...storageState, date: moment(storageState.date)}
    } else {
      initState = {
        date: moment(),
        navSelected: 'expanse',
        transactions: []
      }
    }
    this.state = initState;
  }

  handleSubtractDay = () => {
    this.setState({date: this.state.date.subtract(1, 'day')});
  }

  handleAddDay = () => {
    this.setState({date: this.state.date.add(1, 'day')});
  }

  handleNavClick = (event) => {
    this.setState({navSelected: event.target.getAttribute('name')});
  }

  handleSubmitTransaction = (sum, category) => {
    const {date: TodayDate, transactions} = this.state;

    const newTransaction = {
      date: TodayDate.format('DD.MM.YYYY'),
      category: category,
      sum: sum,
    };

    const newTransactions = [...transactions, newTransaction];

    newTransactions.sort((a, b) => {
      const aDate = moment(a.date, 'DD.MM.YYYY');
      const bDate = moment(b.date, 'DD.MM.YYYY');
      return aDate.isAfter(bDate);
    });

    this.setState({transactions: newTransactions});
  };

  componentDidUpdate() {
    const {date} = this.state;
    localStorage.setItem(
      'state',
      JSON.stringify({...this.state, date: date.format()})
    )
  }

  onToday = () => {
    const {transactions, date} = this.state;

    const currentMonthTransactions = transactions.filter(
      ({date: transactionDate}) => moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month')
    );

    const dailyMoney = currentMonthTransactions.reduce((acc, transaction) => {
      return transaction.sum > 0 ? transaction.sum + acc : acc;
    }, 0) / moment(date).daysInMonth();
  };

  render() {
    const {date, navSelected, transactions} = this.state;

    return (
      <section>
        <header>
          <h1>Бюджет</h1>
          <DateLine>
            <p>{date.format('DD.MM.YYYY')}</p>
            <DateButton onClick={this.handleSubtractDay}>-</DateButton>
            <DateButton onClick={this.handleAddDay}>+</DateButton>
          </DateLine>
          <Tod>Бюджет на сегодня: {this.onToday()}</Tod>
        </header>
        <main>
          <Nav>
            <Link 
              name="expanse"
              onClick={this.handleNavClick}
              selected={navSelected === 'expanse'}
            >
            Расходы сегодня
            </Link>
            <Link
              name="incomes"
              onClick={this.handleNavClick}
              selected={navSelected === 'incomes'}
            >
            Доходы
            </Link>
          </Nav>

          {navSelected === 'expanse' ? <Expanse onSubmit={this.handleSubmitTransaction}/> : <Incomes onSubmit={this.handleSubmitTransaction}/>}
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
                    <td>{sum} HRN</td>
                    <td>{category}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </main>

      </section>
    )
  }
} 


const DateButton = styled.button`
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: transparent;
  width: 32px;
  height: 32px;
  margin: 3px;
  cursor: pointer;
  text-align: center;
  outline: none;

  :hover {
    background: #6ecaff;
    transition: 0.4s;
  }
`;

const DateLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Link = styled.span`
  font-family: 'Marmelad';
  cursor: pointer;
  color: white;
  margin: 0 8px;
  border-bottom: ${({selected}) =>
    selected ? '2px solid white' : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 25px;
  padding: 40px 0 15px;
`;

const Table = styled.table`
  width: 460px;
  text-align: center;
  padding-top: 30px;
  margin: 0 auto;
`;
const Tod = styled.h3`
  text-align: center;
`

export default App;
