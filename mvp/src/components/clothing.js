import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 

function StorePage() {
    const items = [
        { imgSrc: "basictee.png", itemimage: "basictee", itemName: "Basic Tee", price: 35, isNecessity: false },
        { imgSrc: "loungetee.png", itemName: "Lounge Tee", price: 40, isNecessity: false },
        { imgSrc: "baggysweater.png", itemName: "Baggy Sweater", price: 45, isNecessity: false },
        { imgSrc: "softtee.png", itemName: "Soft Tee", price: 50, isNecessity: false },
        { imgSrc: "orangepolo.png", itemName: "Orange Polo", price: 55, isNecessity: false },
        { imgSrc: "onsie.png", itemName: "The Onesie", price: 65, isNecessity: false },
        { imgSrc: "lavenderwrap.png", itemName: "Lavender Wrap", price: 75, isNecessity: false },
        { imgSrc: "redpuffer.png", itemName: "Red Puffer", price: 85, isNecessity: false},
        // all vectors sourced from Vecteezy with a premium license
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {firstHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity} />
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StorePage;

