import React from 'react';
import StoreNavigator from './storeNavigator'; 
import Footer from './hpfooter';
import PetBox from './petBox';

function Pets() {
    const items = [
        { imgSrc: "hiro2.png", price: 200 },
        { imgSrc: "cashmere.png", price: 200 },
        { imgSrc: "toto.png", price: 200 },
        { imgSrc: "ayumi.png", price: 200 },
        { imgSrc: "simba.png", price: 200 },
        { imgSrc: "cat1.png", price: 200 },
        { imgSrc: "cat2.png", price: 200 },
        { imgSrc: "cat3.png", price: 200 },
        { imgSrc: "cat4.png", price: 200 },
        { imgSrc: "cat5.png", price: 200 },
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