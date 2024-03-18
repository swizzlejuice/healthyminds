import React from 'react';
import DiaryBox from './DiaryBox'; 

function DiaryTags() {
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

    const rows1 = [];
    for (let i = 0; i < items1.length; i += 5) {
        rows1.push(items1.slice(i, i + 5));
    }

    const rows2 = [];
    for (let i = 0; i < items2.length; i += 5) {
        rows2.push(items2.slice(i, i + 5));
    }

    const rows3 = [];
    for (let i = 0; i < items3.length; i += 5) {
        rows3.push(items3.slice(i, i + 5));
    }

    const rows4 = [];
    for (let i = 0; i < items4.length; i += 5) {
        rows4.push(items4.slice(i, i + 5));
    }

    return (
        <div className="container">
            <p className="diary-text">Weather</p>
            <div className="row mt-5 justify-content-center">
                {rows1.map((row, index) => (
                    <div key={index} className="row">
                        {row.map((item, idx) => (
                            <div key={idx} className="col-md-2">
                                <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <p className="diary-text">Events</p>
            <div className="row mt-5 justify-content-center">
                {rows2.map((row, index) => (
                    <div key={index} className="row">
                        {row.map((item, idx) => (
                            <div key={idx} className="col-md-2">
                                <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <p className="diary-text">Social</p>
            <div className="row mt-5 justify-content-center">
                {rows3.map((row, index) => (
                    <div key={index} className="row">
                        {row.map((item, idx) => (
                            <div key={idx} className="col-md-2">
                                <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <p className="diary-text">Hobbies</p>
            <div className="row mt-5 justify-content-center">
                {rows4.map((row, index) => (
                    <div key={index} className="row">
                        {row.map((item, idx) => (
                            <div key={idx} className="col-md-2">
                                <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiaryTags;
