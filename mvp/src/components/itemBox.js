import React from 'react';

function ItemBox({ imgSrc, itemName, price }) {
    return (
        <div className="col-md-2">
            <div className="item-box">
                <img src={imgSrc} alt={itemName} className="item-images" />
                <p className="item-text">{itemName}</p>
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>${price}</span>
                    </div>
                    <button className="buy-button">Buy</button>
                </div>
            </div>
        </div>
    );
}

export default ItemBox;