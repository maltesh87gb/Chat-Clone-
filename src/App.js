
import './App.css';
// import PostMessage from './component/PostMessage';
import ChatBoxMeesage from './component/ChatBoxMessage';
// import CommitMessages from './component/CommitMessages';
// import EditeMessage from './component/EditeMessage';



function App() {
  return (
    <div className="App">
     {/* <PostMessage/> */}
     {/* <CommitMessages/> */}
     {/* <EditeMessage/> */}
     <ChatBoxMeesage currentUserId="1"/>
    </div>
  );
}

export default App;
