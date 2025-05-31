import { useTypewriter } from "react-simple-typewriter";
import React from 'react';

export function TypeWriter() {
    const [text] = useTypewriter({
        words: [" Pawse"],
        loop: 1,
        typeSpeed: 130,
    });

    return (
            <div className="signin-head">
                {text}
            </div>
    );
}


 