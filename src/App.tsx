import "./App.css";
import SearchBar from "./components/Search";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Title>Series WatchTime Calculator</Title>
      <SearchBar />
    </div>
  );
}

export default App;

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Kanit&family=Lexend+Deca:wght@200;500&display=swap") font-family:
      "Kanit",
    sans-serif;
  font-family: "Lexend Deca", sans-serif;
`;
