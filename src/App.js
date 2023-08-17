import React ,{useState, useRef,useEffect} from "react"

const getcloud=()=>"Be active! Take on responsibility! Work for the things you believe in. If you do not, you are surrendering your fate to others.".split(" ").sort(()=>Math.random()>0.5?1:-1)

function Word(props){
  const {text,active,correct}=props
  if(active){
    return <span className="active">{text} </span>
  }
  if (correct===true){
    return <span className="correct">{text} </span>
  }
  if (correct===false){
    return <span className="incorrect">{text} </span>
  }
  return <span>{text} </span>
}

function Timer(props){
  const {correctwor,startcoun}=props
  const [timps,setTimps]=useState(0)
  useEffect(()=>{
    let id
    if (props.startcoun){
      id =setInterval(()=>{
        setTimps(oldinter=>oldinter+1)
      },1000)
      return()=>{
        clearInterval(id)
      }
    }

  },[props.startcoun])
  const minutes=timps/60
  return <div>
      <p>Timer:{timps}</p>
      <p>speed:{((correctwor/minutes)||0).toFixed(2)} WPM</p>
      </div>
}

function App() {
  const [userinput,setUserinput]=useState("")
  const cloud=useRef(getcloud())
  const [startcoun,setStartcoun]=useState(false)
  const [activeindex,setActiveindex]=useState(0)
  const [correctar,setCorrectar]=useState([])


  function processinput(value){
    if (activeindex===cloud.current.length){
      return
    }
    if(!startcoun){
      setStartcoun(true)
    }
    if(value.endsWith(" ")){
      if (activeindex===cloud.current.length-1){
        setStartcoun(false)
        setUserinput("completed")
      }
      else{
        setUserinput("")
      }
      setActiveindex(index=>index+1)
      
      setCorrectar(data=>{
        const word=value.trim()
        const newResult=[...data]
        newResult[activeindex]=word===cloud.current[activeindex]
        
        return newResult

      })
    }
    else{
      setUserinput(value)
    }
  }

  return (
    <div className="header">
    <h1 className="head">Test your typing speed !!</h1>
    
    <Timer startcoun={startcoun}
    correctwor={correctar.filter(Boolean).length}
    />
    <p>{cloud.current.map((word,index)=>{
      return <Word 
      text={word}
      active={index===activeindex}  
      correct={correctar[index]}
       />
    })}</p>
    <input
    type="text"
    value={userinput}
    onChange={(e)=>processinput(e.target.value)}  
    div/>

    </div>
  );
}

export default App;
