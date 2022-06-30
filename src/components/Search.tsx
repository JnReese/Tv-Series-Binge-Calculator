import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import CardDisplay from "./CardDisplay";
import Chip from "@mui/material/Chip";
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { uniq } from "lodash";
import { useState, useEffect } from "react";

export interface MovieSearch {
  show: {
    name: string;
    id: number;
    image?: {
      medium?: string;
    };
  };
}

export interface EpisodeList {
  airtime: string;
  runtime: number;
}

export default function FreeSolo() {
  const [searchSeriesTerm, setSearchSeriesTerm] = useState<string | null>("");
  const [searchSeriesResults, setSearchSeriesResults] = useState<MovieSearch[]>([]);
  const [errorPop, setErrorPop] = useState<boolean>(false);
  const [everyId, setEveryId] = useState<number[]>([]);
  const [searchHit, setSearchHit] = useState<boolean>(false);
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [loadingAutoFill, setLoadingAutoFill] = useState<boolean>(false);
  const [seriesPoster, setSeriesPoster] = useState<string | undefined>("");
  const [allEpisodes, setAllEpisodes] = useState<EpisodeList[]>([]);

  console.log(loadingResponse);

  useEffect(() => {
    if (searchSeriesTerm) {
      setLoadingAutoFill(true);
      fetch(`https://api.tvmaze.com/search/shows?q=${searchSeriesTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchSeriesResults(data))
        .finally(() => setLoadingAutoFill(false));
      if (searchSeriesResults.map((result) => result.show?.id)) {
        setEveryId(searchSeriesResults.map((series) => series.show.id));
      }
    }
  }, [searchSeriesTerm]);

  const handleShowSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSeriesTerm(e.target.value);
  };

  const handleUserPickedShow = (event: React.SyntheticEvent<Element, Event>) => {
    setSearchSeriesTerm(event.currentTarget.textContent);
    if (event.currentTarget.textContent === null) {
      setErrorPop(true);
    } else {
      setErrorPop(false);
    }
  };

  const handleSeriesButtonPressed = () => {
    setSearchHit(true);
    setLoadingResponse(true);
    if (searchSeriesResults.length !== 0) {
      fetch(`https://api.tvmaze.com/shows/${everyId[0]}/episodes`)
        .then((response) => response.json())
        .then((data) => setAllEpisodes(data))
        .finally(() => setLoadingResponse(false));
      setErrorPop(false);
    } else {
      setErrorPop(true);
    }
  };

  const handlePoster = () => {
    searchSeriesResults[0].show.image?.medium
      ? setSeriesPoster(searchSeriesResults[0].show.image?.medium)
      : setSeriesPoster(undefined);
  };

  return (
    <OverallContainer>
      <SearchAndButtonContainer>
        <SearchAndLoaderConatiner>
          {loadingAutoFill ? (
            <Stack sx={{ color: "grey.500" }} spacing={1} mx={1} direction="row">
              <CircularProgress className="autofillLoader" color="success" />
            </Stack>
          ) : null}
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={uniq(searchSeriesResults.map((show) => show?.show?.name))}
              onChange={handleUserPickedShow}
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
        </SearchAndLoaderConatiner>
        <InputSearchButton
          className="searchButton"
          onClick={(e) => {
            handleSeriesButtonPressed();
            handlePoster();
          }}
        >
          View Series Stats
        </InputSearchButton>
      </SearchAndButtonContainer>

      {loadingResponse ? (
        <Stack sx={{ width: "25%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      ) : null}

      {errorPop ? <Chip label="No Valid Search Input" color="warning" /> : null}
      <CardDisplay seriesPoster={seriesPoster} allEpisodes={allEpisodes} searchHit={searchHit} />
    </OverallContainer>
  );
}

const OverallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  .autofillLoader {
    position: relative;
  }
`;
const SearchAndButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  @media (max-width: 700px) {
    flex-direction: column;
    margin-top: 2rem;
    .searchButton {
      margin-top: 2rem;
    }
  }
`;
const SearchAndLoaderConatiner = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 700px) {
    flex-direction: row;
    margin-top: 2rem;
  }
`;
const InputSearchButton = styled.button`
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 1rem;
  margin-left: 2rem;

  &:hover {
    background-color: #fff;
  }

  &:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  @media (min-width: 768px) {
    .button-74 {
      min-width: 120px;
      padding: 0 25px;
    }
  }
`;
