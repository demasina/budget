import React, { Component } from 'react';
import Expanse from './Expanse.jsx';
import Incomes from './Incomes.jsx';
import moment from 'moment';
import styled from 'styled-components';
import {findLastIndex} from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      navSelected: 'expanse',
      transactions: []
    }
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
      category,
      sum,
    }

    const index = findLastIndex(transactions, ({date}) => {
      const transactionDate = moment(date, 'DD.MM.YYYY');
      return (
        TodayDate.isBefore(transactionDate, 'day') ||
        TodayDate.isSame(transactionDate, 'day')
      );
    });

    const newTransactions = [...transactions];
    newTransactions.splice(index === -1 ? transactions.length : index, 0, newTransaction);

    this.setState({transactions: newTransactions});
  }

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
  width: 450px;
  text-align: center;
  padding-top: 30px;
  margin: 0 auto;
`;

export default App;
