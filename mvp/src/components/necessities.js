import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 
import Footer from './hpfooter';

function Necessities() {
    const items = [
        { imgSrc: "basicbowlT.png", itemName: "Pet Bowl", price: 25, isNecessity: true },
        { imgSrc: "boneT.png", itemName: "Bone Chew", price: 30, isNecessity: true },
        { imgSrc: "dogballT.png", itemName: "Dog Balls", price: 35, isNecessity: true },
        { imgSrc: "ballyarnT.png", itemName: "Ball of Yarn", price: 35, isNecessity: true },
        { imgSrc: "mouseT.png", itemName: "Ultimate Mouse", price: 40, isNecessity: true },
        { imgSrc: "cattoyT.png", itemName: "Cat Toy", price: 50, isNecessity: true },
        { imgSrc: "beartoyT.png", itemName: "Stuffed Bear", price: 60, isNecessity: true },
        { imgSrc: "scratchT.png", itemName: "Scratching Post", price: 70, isNecessity: true },
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
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity}/>
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Necessities;
