import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={10} />
    </Box>
  );
}
