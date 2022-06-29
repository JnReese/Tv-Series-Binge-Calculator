import Box from "@mui/material/Box";
import styled from "styled-components";
import { EpisodeList } from "./Search";

interface CardInfo {
  seriesPoster: string | undefined;
  allEpisodes: EpisodeList[];
  searchHit: boolean;
}

export default function SimplePaper({ seriesPoster, allEpisodes, searchHit }: CardInfo) {
  const handleCalc = () => {
    let allNumbers =
      allEpisodes[0].airtime !== ""
        ? allEpisodes.map((episode) => parseInt(episode.airtime.substring(0, 2)))
        : allEpisodes.map((episode) => episode.runtime);
    const allNumbersFiltered = allNumbers.filter((el) => el);
    const sumOfAllNumbers = allNumbersFiltered.reduce((previousValue, currentValue) => previousValue + currentValue);
    const NumbersToSeconds = sumOfAllNumbers * 60;
    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const days = Math.floor(totalSeconds / (3600 * 24));

      const minutesStr = makeHumanReadable(minutes, "minute");
      const hoursStr = makeHumanReadable(hours, "hour");
      const daysStr = makeHumanReadable(days, "day");

      return `${daysStr}${hoursStr}${minutesStr}`.replace(/,\s*$/, "");
    };

    const makeHumanReadable = (num: number, singular: string) => {
      return num > 0 ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `) : "";
    };

    return `Total Time To Watch Series : ${formatTime(NumbersToSeconds)}`;
  };

  return (
    <Container>
      {allEpisodes ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 200,
              height: 250,
            },
          }}
        >
          {seriesPoster ? (
            <Picture src={seriesPoster}></Picture>
          ) : (
            <Picture src={`${process.env.PUBLIC_URL}/assets/fillerImg.jpg`}></Picture>
          )}
        </Box>
      ) : null}
      <Text>{allEpisodes.length > 0 ? handleCalc() : null}</Text>
      <Text>{allEpisodes.length === 0 && searchHit ? "No Series Information, Try Another!" : null}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Picture = styled.img`
  object-fit: cover;
`;
const Text = styled.p`
  font-size: 2rem;
`;
