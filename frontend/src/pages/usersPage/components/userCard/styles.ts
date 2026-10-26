import { createUseStyles } from "react-jss";

export const useUserCardStyles = createUseStyles({
  card: {
    padding: "24px",
    backgroundColor: "#fff",
    border: "1px solid #dfe3e8",
    borderRadius: "12px",
  },
  displayName: {
    margin: 0,
    color: "#17202a",
    fontSize: "18px",
    fontWeight: 700,
  },
  username: {
    margin: "8px 0 0",
    color: "#657786",
    fontSize: "14px",
  },
});
