import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; 

function ItemBox({ imgSrc, itemName, price }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [coinCount, setCoinCount] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false); // New state to track if item is purchased
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchUserData(user.uid);
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    const fetchUserData = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
    
        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setCoinCount(userData.coinCount || 0);
                setIsPurchased(userData.purchasedItems && userData.purchasedItems.hasOwnProperty(itemName));
            }
        });
    };


    const handleClick = (itemPrice, itemName, imgSrc) => () => {
        if (currentUser) {
            if (isPurchased) {
                navigate('/myCloset'); // Navigate to closet if item is already purchased
            } else {
                const db = getDatabase();
                const userId = currentUser.uid;
                const newCoinCount = coinCount - itemPrice;
    
                if (newCoinCount < 0) {
                    alert("You need more coins to purchase this item!");
                } else {
                    const userRef = ref(db, `users/${userId}`);
                    const updates = {};
                    updates['coinCount'] = newCoinCount; // Update coin count
                    updates[`purchasedItems/${itemName}`] = { imgSrc, itemName }; // Update purchased items
    
                    update(userRef, updates) // Perform a single update call
                        .then(() => {
                            setCoinCount(newCoinCount); // Update coin count in state
                            setIsPurchased(true); // Set item as purchased
                            alert("Purchase successful! View your item in the closet.");
                        })
                        .catch((error) => {
                            console.error("Error updating user data: ", error);
                        });
                }
            }
        }
    };
    


    

    return (
        <div className="col-md-2">
            <div className="item-box d-flex flex-column align-items-center">
                <img src={imgSrc} alt={itemName} className="item-images" />
                <p className="item-text">{itemName}</p>
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>{price}</span>
                    </div>
                    <button className="buy-button" onClick={handleClick(price, itemName, imgSrc)}>{isPurchased ? 'View item in closet' : 'Buy'}</button>
                </div>
            </div>
        </div>
    );
}

export default ItemBox;
