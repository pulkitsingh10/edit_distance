import React, { useState } from 'react'
// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Icon, IconButton } from '@mui/material';


function InputBox({ runAlgo}) {
    const [word, setWord] = useState("");
    const handleSearch = (e) => {
        
        runAlgo(word);
        console.log(word);
    }
    return (
        <div className='inputBox'>
            {/* <p>hello</p> */}
            <div className='box' style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <input type='text' placeholder={"Input string : "} onChange={(e) => setWord(e.target.value)}></input>
                <IconButton onClick={handleSearch} >
                    <SearchIcon />
                </IconButton>

            </div>
        </div>


    )
}

export default InputBox