import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  card: {
    padding: "24px",
    backgroundColor: "#fff",
    border: "1px solid #dfe3e8",
    borderRadius: "12px",
    overflowWrap: "anywhere",
  },
  author: {
    margin: 0,
    color: "#17202a",
    fontSize: "16px",
    fontWeight: 700,
  },
  username: {
    marginTop: "4px",
    color: "#657786",
    fontSize: "14px",
  },
  name: {
    margin: "16px 0 8px",
    fontSize: "18px",
    fontWeight: 700,
  },
  text: {
    margin: 0,
    color: "#35434f",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  media: {
    display: "inline-block",
    marginTop: "16px",
    color: "#1769aa",
    overflowWrap: "anywhere",
  },
  mediaAttachment: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    padding: "8px 12px",
    border: "1px solid #dfe3e8",
    borderRadius: "6px",
    background: "none",
    cursor: "pointer",
  },
  pdfIcon: {
    fontWeight: 700,
    color: "#d32f2f",
  },
  mediaName: {
    overflowWrap: "anywhere",
  },
  mediaImage: {
    marginTop: '16px',
    maxWidth: '100%',
    borderRadius: '8px',
  },
  mediaFrame: {
    marginTop: '16px',
    width: '100%',
    height: '400px',
    border: '1px solid #dfe3e8',
    borderRadius: '8px',
  },
  footer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #edf0f2",
    color: "#657786",
    fontSize: "14px",
  },
});
