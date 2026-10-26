import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
  },
  message: {
    padding: "24px",
    backgroundColor: "#fff",
    border: "1px solid #dfe3e8",
    borderRadius: "12px",
    color: "#657786",
  },
  error: {
    color: "#b42318",
  },
});
