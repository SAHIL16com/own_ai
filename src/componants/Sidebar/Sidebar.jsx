import React, { useState } from "react";
import "./Sidebar.css";
import {Menu,Plus,MessageSquare,CircleQuestionMark,History,Settings,} from "lucide-react";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

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

            <div className="recent_entry">
              <MessageSquare size={18} />
              <p>What is React?</p>
            </div>

            <div className="recent_entry">
              <MessageSquare size={18} />
              <p>Explain JavaScript</p>
            </div>
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