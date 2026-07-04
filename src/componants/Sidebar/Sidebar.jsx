import React, { useState } from "react";
import "./Sidebar.css";
import { Menu, Plus, MessageSquare, CircleQuestionMark, History, Settings, } from "lucide-react";
import { useContext } from "react";
import { Context } from "../../Context/Context.jsx";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompts } = useContext(Context);

  return (
    <div className={`sidebar ${extended ? "expanded" : "collapsed"}`}>
      <div className="top">
        <Menu className="menu" onClick={() => setExtended(!extended)} />

        <div className="new-chat">
          <Plus />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent_title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent_entry">
                  <MessageSquare size={18} />
                  <p>{item.slice(0, 20)}..</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom_item">
          <CircleQuestionMark />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom_item">
          <History />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom_item">
          <Settings />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;