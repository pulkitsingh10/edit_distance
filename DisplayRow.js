import React from 'react';

const DisplayRow = ({ dist, word }) => {
    return (


        <div className='rowContainer'>
            {/* {console.log("from display")} */}
            {/* <span className='ColHeader'>Edit Distance</span>
            <span className='ColHeader'>Word</span> */}
            <span className='dist'>{dist}</span>
            <span className='word'>{word}</span>
        </div>
    );
};

export default DisplayRow;