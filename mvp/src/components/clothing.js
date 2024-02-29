import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 

function StorePage() {
    const items = [
        { imgSrc: "basictee.png", itemName: "Basic Tee", price: 10 },
        { imgSrc: "orangepolo.png", itemName: "Orange Polo", price: 20 },
        { imgSrc: "onsie.png", itemName: "The Onesie", price: 40 },
        { imgSrc: "winterjacket.png", itemName: "Winter Jacket", price: 50 },
        { imgSrc: "baggysweater.png", itemName: "Baggy Sweater", price: 30 },
        { imgSrc: "redpuffer.png", itemName: "Red Puffer", price: 45 },
        { imgSrc: "softtee.png", itemName: "Soft Tee", price: 20 },
        { imgSrc: "cozyfleece.png", itemName: "Cozy Fleece", price: 15 },
    ];


    // Splitting items array into two halves
    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {/* First Row */}
                    {firstHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {/* Second Row */}
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StorePage;
