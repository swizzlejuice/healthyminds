import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 
import Footer from './hpfooter';

function StorePage() {
    const items = [
        { imgSrc: "basictee.png", itemName: "Basic Tee", price: 10 },
        { imgSrc: "orangepolo.png", itemName: "Orange Polo", price: 20 },
        { imgSrc: "onsie.png", itemName: "Orange Polo", price: 40 },
        { imgSrc: "winterjacket.png", itemName: "Orange Polo", price: 50 },
        { imgSrc: "baggysweater.png", itemName: "Orange Polo", price: 30 },
        { imgSrc: "redpuffer.png", itemName: "Orange Polo", price: 45 },
        { imgSrc: "softtee.png", itemName: "Orange Polo", price: 20 },
        { imgSrc: "cozyfleece.png", itemName: "Orange Polo", price: 15 },
        
    ];

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {items.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StorePage;