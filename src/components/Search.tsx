import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import CardDisplay from "./CardDisplay";
import { useState, useEffect } from "react";

interface MovieSearch {
  title: string;
}

export default function FreeSolo() {
  const [searchSeriesTerm, setSearchSeriesTerm] = useState<string>("");
  const [searchSeriesResults, setSearchSeriesResults] = useState<MovieSearch[]>([]);
  console.log(searchSeriesTerm);

  useEffect(() => {
    if (searchSeriesTerm) {
      fetch(`https://api.tvmaze.com/search/shows?q=${searchSeriesTerm}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }, [searchSeriesTerm]);

  const handleShowSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSeriesTerm(e.target.value);
  };

  return (
    <Container>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={Series.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={handleShowSearch}
            />
          )}
        />
      </Stack>
      <CardDisplay />
    </Container>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Series = [{ title: "The Shawshank Redemption" }];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
