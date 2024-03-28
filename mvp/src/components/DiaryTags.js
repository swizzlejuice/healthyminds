import React, { useState, useRef } from 'react';
import DiaryBox from './DiaryBox'; 
import { Input } from 'rsuite';
import { push, ref, getDatabase, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

function DiaryTags() {
    const [selectedTags, setSelectedTags] = useState([]);
    const textareaRef = useRef(null); 
    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevTags => prevTags.filter(item => item !== tag));
        } else {
            setSelectedTags(prevTags => [...prevTags, tag]);
        }
    };
    
    const handleFormSubmit = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const diaryEntriesRef = ref(db, 'users/' + userId + '/diaryEntries');
            const entryData = {
                tags: selectedTags,
                description: textareaRef.current.value 
            };
    
            push(diaryEntriesRef, entryData).then(() => {
                updateCoinCount(userId, 5);
                navigate('/diarymodal');
            });
        }
    };    
    
    const updateCoinCount = (userId, coins) => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        get(userRef).then(snapshot => {
            const userData = snapshot.val();
            if (userData && userData.coinCount !== undefined) {
                const newCoinCount = userData.coinCount + coins;
                const updates = {};
                updates['coinCount'] = newCoinCount;
                update(ref(db, 'users/' + userId), updates);
            }
        });
    };
    
    const items1 = [
        { imgSrc: "sunny.png", tag: "Sunny" },
        { imgSrc: "cloudy.png", tag: "Cloudy" },
        { imgSrc: "rainy2.png", tag: "Rainy" },
        { imgSrc: "snow.png", tag: "Snowy" },
        { imgSrc: "windy2.png", tag: "Windy" },
    ];

    const items2 = [
        { imgSrc: "school.png", tag: "School" },
        { imgSrc: "work.png", tag: "Work" },
        { imgSrc: "vacation.png", tag: "Vacation" },
        { imgSrc: "travel.png", tag: "Travel" },
    ];

    const items3 = [
        { imgSrc: "family.png", tag: "Family" },
        { imgSrc: "friends.png", tag: "Friends" },
        { imgSrc: "party.png", tag: "Party" },
        { imgSrc: "call.png", tag: "Call" },
        { imgSrc: "dating.png", tag: "Dating" },
    ];

    const items4 = [
        { imgSrc: "games.png", tag: "Games" },
        { imgSrc: "shopping.png", tag: "Shopping" },
        { imgSrc: "photography.png", tag: "Photography" },
        { imgSrc: "listenmusic.png", tag: "Listening to Music" },
        { imgSrc: "playinginstrument.png", tag: "Playing Instrument" },
        { imgSrc: "gardening.png", tag: "Gardening" },
        { imgSrc: "baking.png", tag: "Baking" },
        { imgSrc: "cooking.png", tag: "Cooking" },
        { imgSrc: "art & crafts.png", tag: "Arts & Crafts" },
        { imgSrc: "moviestv.png", tag: "Movies & TV" },
        { imgSrc: "health&fitness.png", tag: "Fitness" },
        { imgSrc: "sports.png", tag: "Sports" },
        { imgSrc: "reading.png", tag: "Reading" },
        { imgSrc: "writing.png", tag: "Writing" },
        { imgSrc: "makeup.png", tag: "Makeup" },
    ];

    const rows1 = chunkArray(items1, 5);
    const rows2 = chunkArray(items2, 5);
    const rows3 = chunkArray(items3, 5);
    const rows4 = chunkArray(items4, 5);

    return (
        <div className="tags-cont">
            <p className="diary-text">Weather</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows1)}
            </div>
            <p className="diary-text">Events</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows2)}
            </div>
            <p className="diary-text">Social</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows3)}
            </div>
            <p className="diary-text">Hobbies</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows4)}
            </div>
            <p className="diary-p2">Add an optional description :)</p>
            <Input as="textarea" rows={4} placeholder="Type diary entry here" className="diary-form"
                inputRef={textareaRef} />
            <button className="diary-btn" onClick={handleFormSubmit}>Submit</button>
        </div>
    );

    function chunkArray(array, size) {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    function renderRows(rows) {
        return rows.map((row, index) => (
            <div key={index} className="row">
                {row.map((item, idx) => (
                    <div key={idx} className="col-md-2" onClick={() => handleTagClick(item.tag)}>
                        <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                    </div>
                ))}
            </div>
        ));
    }
}

export default DiaryTags;
