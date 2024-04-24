import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 
import Footer from './hpfooter';

function Necessities() {
    const items = [
        { imgSrc: "basicbowl.png", itemName: "Basic Bowl", price: 1 },
        { imgSrc: "catbowl.png", itemName: "Cat Bowl", price: 35 },
        { imgSrc: "dogbowl.png", itemName: "Dog Bowl", price: 35 },
        { imgSrc: "polkadot.png", itemName: "Polka Dot", price: 40 },
        { imgSrc: "dogball.png", itemName: "Dog Ball", price: 30 },
        // inspo attribution: freepik, vector created in figma
        { imgSrc: "cattoy.png", itemName: "Cat Toy", price: 50 },
        // inspo attribution: shutterstock, vector created in figma
        { imgSrc: "basicmouse.png", itemName: "Basic Mouse", price: 25 },
        { imgSrc: "ultimate.png", itemName: "Ultimate Mouse Toy", price: 60 },
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
            <Footer />
        </div>
    );
}

export default Necessities;
