import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 
import Footer from './hpfooter';

function Necessities() {
    const items = [
        { imgSrc: "basicbowl.png", itemName: "Basic Bowl", price: 10 },
        { imgSrc: "catbowl.png", itemName: "Cat Bowl", price: 25 },
        { imgSrc: "dogbowl.png", itemName: "Dog Bowl", price: 25 },
        { imgSrc: "polkadot.png", itemName: "Polka Dot", price: 30 },
        { imgSrc: "dogball.png", itemName: "Dog Ball", price: 20 },
        { imgSrc: "cattoy.png", itemName: "Cat Toy", price: 30 },
        { imgSrc: "basicmouse.png", itemName: "Basic Mouse", price: 15 },
        { imgSrc: "ultimate.png", itemName: "Ultimate Mouse Toy", price: 40 },
        
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

export default Necessities;