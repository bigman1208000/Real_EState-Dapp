import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { acceptOffer, checkOffer } from '../../actions/property';
import Alert from '../layout/alert';

const PropertyItem = ({ property, auth, acceptOffer, checkOffer }) => {
  const setOffer = (ofer, offerId, userAcc) => {
    acceptOffer(property.tokenId, ofer, property._id, offerId, userAcc);
  };
  const CheckingOffer = userAcc => {
    checkOffer(property.tokenId, userAcc);
  };

  return (
    <Fragment>
      <Alert />

      <Fragment>
        {property.offers.map(offer => (
          <div className='post bg-white p-1 my-1' key={offer._id}>
            <div>
              <p className='my-1'>
                <strong>Price Offer</strong>{' '}
                <strong>{offer.offerValue}ETH</strong>
              </p>
              <p className='post-date'>
                Posted on {<Moment format='YYYY/MM/DD'>{offer.date}</Moment>}
              </p>
              {property.user._id !== auth.user._id &&
                offer.user === auth.user._id &&
                offer.offerValue && (
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={e => CheckingOffer(offer.account)}
                  >
                    Check your offer
                  </button>
                )}
              {!auth.isLoading && property.user._id === auth.user._id && (
                <Fragment>
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={e => setOffer(true, offer._id, offer.account)}
                  >
                    <i className='fas fa-check'></i>
                  </button>

                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={e => setOffer(false, offer._id)}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </Fragment>
    </Fragment>
  );
};

PropertyItem.propTypes = {
  property: PropTypes.object.isRequired,
  acceptOffer: PropTypes.func.isRequired,
  checkOffer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { acceptOffer, checkOffer })(
  PropertyItem
);
