import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styles from '../styles/filters.scss';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileToggle: false,
    };
    this.updateNameSearch = debounce(this.updateNameSearch.bind(this), 500);
    this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
  }


  updateNameSearch(e) {
    const { value } = e.target;
    const { filters, updateFilters } = this.props;
    updateFilters({ ...filters, name: value });
  }

  updateCheckboxFilter(e, filter) {
    const { checked, value } = e.target;
    const { filters, updateFilters } = this.props;
    let updatedFilter = filters[filter];
    const newVal = `|${value}`;
    if (checked) {
      updatedFilter = updatedFilter ? updatedFilter + newVal : value;
    } else {
      updatedFilter = updatedFilter.includes('|') ? updatedFilter.replace(newVal, '') : updatedFilter.replace(value, '');
    }
    updateFilters({ ...filters, [filter]: updatedFilter });
  }

  toggleMobileFilters() {
    const { mobileToggle } = this.state;
    this.setState({ mobileToggle: !mobileToggle });
  }

  render() {
    const { mobileToggle } = this.state;
    return (
      <div id={styles.filterBar} className={mobileToggle ? styles.open : ''}>
        <div className={styles.mobileTab} onClick={this.toggleMobileFilters}>Filters</div>
        <img className={styles.logo} src="./assets/logo.png" alt="Elder Scrolls Logo" />
        <input className={styles.searchBox} placeholder="Search by name" onChange={(e) => { e.persist(); this.updateNameSearch(e); }} />
        <div className={styles.section}>
          <h2>Type</h2>
          <ul>
            <li><input type="checkbox" className={styles.checkbox} value="creature" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'type'); }} /> Creature</li>
            <li><input type="checkbox" className={styles.checkbox} value="action" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'type'); }} /> Action</li>
            <li><input type="checkbox" className={styles.checkbox} value="support" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'type'); }} /> Support</li>
            <li><input type="checkbox" className={styles.checkbox} value="item" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'type'); }} /> Item</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Rarity</h2>
          <ul>
            <li><input type="checkbox" className={styles.checkbox} value="common" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'rarity'); }} /> Common</li>
            <li><input type="checkbox" className={styles.checkbox} value="rare" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'rarity'); }} /> Rare</li>
            <li><input type="checkbox" className={styles.checkbox} value="epic" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'rarity'); }} /> Epic</li>
            <li><input type="checkbox" className={styles.checkbox} value="legendary" onChange={(e) => { e.persist(); this.updateCheckboxFilter(e, 'rarity'); }} /> Legendary</li>
          </ul>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  updateFilters: PropTypes.func.isRequired,
};

export default Filters;
