import React from 'react';

function DiaryBox({ imgSrc, tag }) {
    return (
        <div className="col-md-2">
            <div className="item-box text-center">
                <div className="item-content">
                    <img src={imgSrc} className="diarytags" />
                    <span className="tag-title">{tag}</span>
                </div>
            </div>
        </div>
    );
}

export default DiaryBox;
