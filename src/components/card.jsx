import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false,
    };
  }

  render() {
    const { card } = this.props;
    const { imgLoaded } = this.state;
    const imgObject = new Image();
    if (card && card.imageUrl) {
      imgObject.onload = () => {
        this.setState({ imgLoaded: true });
      };
      imgObject.src = card.imageUrl;
    }
    return (
      <li className={styles.card}>
        {card && imgLoaded
          ? (
            <div>
              <img src={imgObject.src} alt={card.name} />
              <div className={styles.info}>
                <h3>{card.name}</h3>
                <div className={styles.set}><em>{card.set.name}</em></div>
                <div><span className={styles[card.type]}>{card.type}</span></div>
                <div>{card.text}</div>
              </div>
            </div>
          )
          : (
            <div className={styles.loading}>
              <div className={styles.imgPlaceholder} />
              <div className={styles.info}>
                <h3>Loading</h3>
                <div className={styles.set} />
                <div />
                <div />
              </div>
            </div>
          )}
      </li>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    set: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

Card.defaultProps = {
  card: null,
};

export default Card;
