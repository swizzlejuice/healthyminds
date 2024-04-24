import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 

function StorePage() {
    const items = [
        { imgSrc: "basictee.png", itemimage: "basictee", itemName: "Basic Tee", price: 2 },
        { imgSrc: "orangepolo.png", itemName: "Orange Polo", price: 1 },
        { imgSrc: "onsie.png", itemName: "The Onesie", price: 1 },
        { imgSrc: "lavenderwrap.png", itemName: "Lavender Wrap", price: 1 },
        { imgSrc: "baggysweater.png", itemName: "Baggy Sweater", price: 40 },
        { imgSrc: "redpuffer.png", itemName: "Red Puffer", price: 60 },
        { imgSrc: "softtee.png", itemName: "Soft Tee", price: 30 },
        { imgSrc: "loungetee.png", itemName: "Lounge Tee", price: 25 },
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {firstHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StorePage;

