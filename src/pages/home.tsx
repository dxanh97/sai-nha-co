import './home.scss';

function Home() {
  return (
    <div className="main">
      <span className="logo">📒</span>
      <button className="btn" type="button">
        New Game
      </button>
      <button className="btn" type="button">
        Game History
      </button>
    </div>
  );
}

export default Home;
