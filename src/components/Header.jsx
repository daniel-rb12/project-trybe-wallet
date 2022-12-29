import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBill1, faMoneyBillWaveAlt }
  from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className="flex h-20 items-center justify-between bg-gray-600">
        <p
          className="text-xl text-white font-bold"
        >
          <FontAwesomeIcon className="pr-2 pl-2" icon={ faMoneyBillWaveAlt } />
          TRYBE WALLET
        </p>
        <p
          data-testid="total-field"
          className="text-xl text-white font-bold"
        >
          <FontAwesomeIcon className="pr-2" icon={ faMoneyBill1 } />
          { `Total das despesas: ${total.toFixed(2)} ` }
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </p>
        <p
          data-testid="email-field"
          className="text-base text-white font-bold pr-2"
        >
          <FontAwesomeIcon className="pr-2" icon={ faEnvelope } />
          { `Email: ${email}` }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.expenses.reduce((acc, curr) => acc
  + (+curr.value * curr.exchangeRates[curr.currency].ask), 0),
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
