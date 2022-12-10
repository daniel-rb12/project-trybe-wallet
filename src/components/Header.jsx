import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ `Email: ${email}` }</span>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
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
