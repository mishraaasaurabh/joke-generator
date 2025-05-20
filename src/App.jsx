import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Play, Pause, SkipBack, SkipForward, CurrencyIcon } from "lucide-react";
import "./App.css";

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songid,setsongid] = useState(0)
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  
  useEffect(()=>{

    axios.get("http://localhost:3000/api/songs")
    .then((response)=>{
      setSongs(response.data)
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    if(currentSongUrl){
      audioRef.current.play();
      setIsPlaying(true)
    }
  },[currentSongUrl])

  

  const controlsongplay = (id)=>{
    let newsong = songs[id-1];
    console.log("this is new song",newsong)
    setCurrentSongUrl(`http://localhost:3000${newsong.url}`)
    setsongid(id-1);
    setTimeout(()=>{
      if(audioRef.current){
        audioRef.current.play();
        setIsPlaying(true);
      }
    },100)
  }

  const controlplaypause = ()=>{
    if(isPlaying){
      audioRef.current.pause();
    }
    if(!isPlaying){
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const nextsong = ()=>{
    let index = (songid + 1 )%songs.length;
    setsongid(index);
    setCurrentSongUrl(`http://localhost:3000${songs[index].url}`)
  }
  const prevsong = ()=>{
    let index = (songid - 1 + songs.length )%songs.length;
    setsongid(index);
    setCurrentSongUrl(`http://localhost:3000${songs[index].url}`)
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans pb-24">
  
      {/* Header */}
      <div className="text-5xl p-6 font-bold text-center text-cyan-400 drop-shadow-[0_0_15px_cyan]">
        Music Player
      </div>
  
      {/* Songs List */}
      <div className="px-4">
        {songs.map((song, i) => (
          <div
            key={song.id}
            onClick={() => controlsongplay(song.id)}
            className="flex items-center justify-start bg-gray-800/60 border border-gray-700 rounded-xl px-6 py-4 my-4 shadow-md hover:shadow-cyan-500/40 transition-transform transform hover:scale-102 cursor-pointer backdrop-blur-sm"
          >
            <Play className="text-emerald-300" />
            <div className="pl-4 text-xl font-medium text-gray-100">
              {song.title}
            </div>
          </div>
        ))}
      </div>
  
      {/* Music Player Control Bar */}
      {currentSongUrl && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-gray-900/80 border border-cyan-400/30 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(0,255,255,0.3)] flex items-center justify-center px-6 py-4 z-50 transition-all duration-300 hover:scale-105">
          <div className="text-cyan-300 font-semibold mr-4 truncate max-w-[30%]">
            {songs[songid]?.title}
          </div>
          <SkipBack
            onClick={prevsong}
            className="mx-4 text-white hover:text-cyan-400 cursor-pointer transition-transform hover:scale-110"
          />
          {!isPlaying ? (
            <Play
              size={35}
              onClick={controlplaypause}
              className="text-white hover:text-cyan-400 cursor-pointer transition-transform hover:scale-110"
            />
          ) : (
            <Pause
              size={35}
              onClick={controlplaypause}
              className="text-white hover:text-cyan-400 cursor-pointer transition-transform hover:scale-110"
            />
          )}
          <SkipForward
            onClick={nextsong}
            className="mx-4 text-white hover:text-cyan-400 cursor-pointer transition-transform hover:scale-110"
          />
        </div>
      )}
  
      <audio src={currentSongUrl} ref={audioRef}></audio>
    </div>
  );
   
}

export default App;
