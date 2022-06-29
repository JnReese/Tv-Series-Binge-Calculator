import "./App.css";
import SearchBar from "./components/Search";
import styled from "styled-components";
import { BiCameraMovie } from "react-icons/bi";

function App() {
  return (
    <div className="App">
      <TitleContainer>
        <Title>Total Series Watchtime Calculator</Title>
        <BiCameraMovie />
      </TitleContainer>
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
  margin-right: 1rem;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
