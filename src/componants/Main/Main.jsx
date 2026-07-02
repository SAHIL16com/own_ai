import React from 'react'
import './Main.css'
import { User } from 'lucide-react';
import { Compass } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { CodeXml } from 'lucide-react';
import { Images } from 'lucide-react';
import { Mic } from 'lucide-react';
import { Send } from 'lucide-react';
const Main = () => {
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <User/>
        </div>
        <div className="main_container">
            <div className="greet">
                <p>
                    <span>Hello</span>
                </p>
                <span>How can I help you today?</span>
            </div>
            <div className="cards">
                <div className="card">
                    <p>what is the capital of france?</p>
                    <Compass/>
                </div>
                <div className="card">
                    <p>solve the mathematic problem</p>
                    <Lightbulb/>
                </div>
                <div className="card">
                    <p>create a message for your partner</p>
                    <MessageSquare/>
                </div>
                <div className="card">
                    <p>imporve the readability of following code:</p>
                    <CodeXml/>
                </div>
            </div>
            <div className="main_bottom">
                <div className="searchbox">
                    <input type="text" placeholder='Enter your prompt here...'/>
                    <div>
                        <Images/>
                        <Mic/>
                        <Send/>
                    </div>
                </div>
                <p>This may display inaccurate information please double check.</p>
            </div>
        </div>
    </div>
  )
}

export default Main
