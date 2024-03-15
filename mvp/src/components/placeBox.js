import React from 'react';

function PlaceBox({ imgSrc, itemName, price }) {
    return (
        <div className="col-md-6">
            <div className="item-box d-flex flex-column align-items-center">
                <img src={imgSrc} alt={itemName} className="place-image" />
                <p className="item-text">{itemName}</p>
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>{price}</span>
                    </div>
                    <button className="buy-button">Buy</button>
                </div>
            </div>
        </div>
    );
}

export default PlaceBox;