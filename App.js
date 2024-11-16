import logo from './logo.svg';
import './App.css';
import InputBox from './InputBox';
import raw from "../src/text.txt"
import { useEffect, useState } from 'react';
import LoadSkeleton from './LoadSkeleton';
import DisplayRow from './DisplayRow';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const words = [];

const loadFileToLocalVariable = async () => {
  const data = await fetch(raw);
  var text = await data.text();
  // console.log(text)
  let lines = text.split('\n'); // Assuming 'file' contains the loaded text

  for (let i = 0; i < lines.length; i++) {
    words.push({ dist: -1, word: lines[i] });
  }
}

function fun(a, b, idx_a, idx_b, dp) {
  if (idx_a === 0)
    return dp[idx_a][idx_b] = idx_b;
  if (idx_b === 0)
    return dp[idx_a][idx_b] = idx_a;
  if (dp[idx_a][idx_b] !== -1)
    return dp[idx_a][idx_b];

  if (a[idx_a - 1] === b[idx_b - 1]) {
    return dp[idx_a][idx_b] = fun(a, b, idx_a - 1, idx_b - 1, dp);
  } else {
    let insertion, deletion, replacement;
    insertion = fun(a, b, idx_a, idx_b - 1, dp);
    replacement = fun(a, b, idx_a - 1, idx_b - 1, dp);
    deletion = fun(a, b, idx_a - 1, idx_b, dp);

    return dp[idx_a][idx_b] = 1 + Math.min(insertion, Math.min(replacement, deletion));
  }
}

function App() {
  var [loading, setLoading] = useState(false);
  const [finalList, setFinalList] = useState([]);
  const [word, setWord] = useState("");


  const runAlgo = async (a) => {
    console.log("load L ", loading);
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let dp = new Array(a.length + 1).fill().map(() => new Array(1000).fill(-1));
      let len_a = a.length;
      let len_b = word.word.length;
      let editDistance = fun(a, word.word, len_a, len_b, dp);
      word.dist = editDistance;
    }
    words.sort((left, right) => left.dist - right.dist);
    var temp = [];
    for (var i = 0; i < 15; i++) {
      console.log(words[i]);
      temp.push(words[i]);
    }

    setFinalList(() => temp);

    console.log("final list : ", finalList);

  }
  const handleSearch = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      await runAlgo(word);
      setLoading(false);
    }, 0); // Adjust the delay duration as needed
  }
  useEffect(() => {
    // console.log('hi');
    const t = async () => {
      await loadFileToLocalVariable();
      console.log(words)
    }
    t();
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={"50px"} />
      </header>
      <div className='container'>
        <p>
          Enter the string:
        </p>
        <div className='inputBox'>
          <div className='box' style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
            <input type='text' placeholder={"Input string : "} onChange={(e) => setWord(e.target.value)}></input>
            <IconButton onClick={handleSearch} >
              <SearchIcon />
            </IconButton>

          </div>
        </div>
        <div className='bodyResults'>
          {(loading ? <LoadSkeleton></LoadSkeleton> :
            (
              finalList.map((w, idx) => {
                console.log("from map :", w);
                return <DisplayRow key={idx} dist={w.dist} word={w.word}  ></DisplayRow>
              })
            ))}
        </div>

      </div>


    </div>
  );
}

export default App;
