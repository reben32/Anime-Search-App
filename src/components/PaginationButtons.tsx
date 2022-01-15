import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    },
    position: 'fixed',
    bottom: 0,
    zIndex: 200,
    backgroundColor: '#fefefe',
    padding: '10px 80px',
    width: '100%'
  }
}));

type Props = {
  setCurrentPage?: any
  page: any
  setQueried: any
}
export const PaginationButtons: React.FC<Props> = ({ setQueried, setCurrentPage, page }) => {
  const classes = useStyles();
  const handlePageChanges = ({ currentPage }: any) => {
    setQueried(true)
    setCurrentPage(currentPage);
    window.scroll(0, 0);
  };
  return (
    <div className={classes.root}>
      {/* paginatyion styles and handle pagination */}
      <Pagination style={{
        display: 'flex',
        justifyContent: 'center'
      }}
        hidePrevButton
        hideNextButton
        size="large"
        variant="outlined"
        onChange={(e) => {
          const input = e.target as HTMLElement;
          handlePageChanges(input.innerHTML)
        }
        }
        count={page}

      />
    </div>
  );
};
