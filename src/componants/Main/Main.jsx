import React from 'react'
import './Main.css'
import {
    User,
    Compass,
    Lightbulb,
    MessageSquare,
    CodeXml,
    Images,
    Mic,
    Send,
} from "lucide-react";
import { useContext } from 'react';
import { Context } from '../../Context/Context.jsx';
const Main = () => {
    const { onSent, recentPrompts, showResult, loading, resultData, input, setInput } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <User />
            </div>
            <div className="main_container">


                {!showResult ?
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello</span>
                            </p>
                            <span>How can I help you today?</span>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>what is the capital of france?</p>
                                <Compass />
                            </div>
                            <div className="card">
                                <p>solve the mathematic problem</p>
                                <Lightbulb />
                            </div>
                            <div className="card">
                                <p>create a message for your partner</p>
                                <MessageSquare />
                            </div>
                            <div className="card">
                                <p>imporve the readability of following code:</p>
                                <CodeXml />
                            </div>
                        </div>

                    </> :
                    <div className="result">
                        <div className="result_title">
                            <User />
                            <p>{recentPrompts}</p>
                        </div>
                        <div>
                            <img src="gemini.png" alt="" />
                            <p dangerouslySetInnerHTML={{ __html: resultData }} />
                        </div>



                    </div>
                }




                <div className="main_bottom">
                    <div className="searchbox">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here...' />
                        <div>
                            <Images />
                            <Mic />
                            <Send onClick={() => onSent()} />
                        </div>
                    </div>
                    <p>This may display inaccurate information please double check.</p>
                </div>
            </div>
        </div>
    )
}

export default Main
