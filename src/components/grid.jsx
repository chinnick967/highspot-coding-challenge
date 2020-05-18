import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid'; // Using uuid in place of card.id for cases where null is passed instead of a card for lazy loading
import throttle from 'lodash/throttle';
import styles from '../styles/grid.scss';
import Card from './card';

const stringifyFilters = (filters) => {
  let filterString = '';
  const keys = Object.keys(filters);
  keys.forEach((key) => { filterString += `&${key}=${filters[key]}`; });
  return filterString;
};

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      page: 1,
      loading: false,
      filters: '',
    };
  }

  componentDidMount() {
    this.fetchCards();
    window.addEventListener('scroll', throttle(this.infiniteLoadScrollEvent.bind(this), 500));
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props;
    if (prevProps.filters !== filters) {
      this.setState({ filters: stringifyFilters(filters), cards: [], page: 1 }, () => {
        this.fetchCards();
      });
    }
  }

  fetchCards() {
    const { cards, page, filters } = this.state;
    this.setState({ loading: true });
    fetch(`https://api.elderscrollslegends.io/v1/cards?pageSize=20&page=${page}${filters}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedCards = data && data.cards ? data.cards : [];
        this.setState({ cards: [...cards, ...fetchedCards], loading: false });
      });
  }

  infiniteLoadScrollEvent() {
    const { page } = this.state;
    const { innerHeight, pageYOffset } = window;
    // Purposefully not loading slightly before hitting bottom of page so lazy loading is visible
    const isBottomOfPage = innerHeight + pageYOffset >= document.body.offsetHeight;
    if (isBottomOfPage) this.setState({ page: page + 1 }, this.fetchCards);
  }

  render() {
    const { cards, loading } = this.state;
    const renderedCards = loading ? [...cards, ...new Array(20).fill(null)] : cards;
    return (
      <ul className={styles.grid}>
        {renderedCards.map((card) => <Card card={card} key={card ? card.name : uuid()} />)}
        {loading && <div className={styles.loading}>Fetching cards...</div>}
      </ul>
    );
  }
}

Grid.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default Grid;
