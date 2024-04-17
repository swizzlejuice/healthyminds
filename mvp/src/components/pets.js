import React from 'react';
import StoreNavigator from './storeNavigator'; 
import Footer from './hpfooter';
import PetBox from './petBox';

function Pets() {
    const items = [
        { imgSrc: "dog1.png", price: 1, itemName: "hiro2" },
        { imgSrc: "dog2.png", price: 2, itemName: "cashmere" },
        { imgSrc: "dog3.png", price: 1, itemName: "toto" },
        { imgSrc: "dog4.png", price: 1, itemName: "ayumi" },
        { imgSrc: "dog5.png", price: 1, itemName: "simba" },
        { imgSrc: "cat1.png", price: 1, itemName: "cat1" },
        { imgSrc: "cat2.png", price: 1, itemName: "cat2" },
        { imgSrc: "cat3.png", price: 2, itemName: "cat3" },
        { imgSrc: "cat4.png", price: 2, itemName: "cat4" },
        { imgSrc: "cat5.png", price: 2, itemName: "cat5" },
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-5 justify-content-center">
                    {firstHalf.map(item => (
                        <PetBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
                <div className="row mt-5 justify-content-center">
                    {secondHalf.map(item => (
                        <PetBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pets;