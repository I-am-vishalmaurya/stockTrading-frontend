import * as React from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
// import Title from './Title';

type ApiDataType = {
  title: string,
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<any>
};

const ApiDataView = (props: ApiDataType) => {
  
  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{marginLeft: 2, marginTop: 2}}>
        <Grid item xs={6}>
            <Typography variant="h5" gutterBottom >
                {props.title}
            </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {/* <TableCell>OI_Crossover</TableCell> */}
                <TableCell>OPT_VWAP_CE_Action</TableCell>
                <TableCell>OPT_VWAP_PE_Action</TableCell>
                <TableCell align="right">FUT_VWAP_Action</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.results.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  {/* <TableCell>{row.OI_Crossover}</TableCell> */}
                  <TableCell align="center">{row.OPT_VWAP_CE_Action}</TableCell>
                  <TableCell align="center">{row.FUT_VWAP_Action}</TableCell>
                  <TableCell align="center">{`${row.OPT_VWAP_PE_Action}`}</TableCell>
                  <TableCell sx={{
                    display: "flex",
                    
                  }}>
                    <Button sx={{
                        backgroundColor: "secondary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "secondary.dark",
                            color: "white",
                        },
                        marginRight: "1rem",
                    }}>
                        Buy
                    </Button>
                    <Button sx={{
                        backgroundColor: "#ffb703",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#fb8500",
                            color: "white",
                        },
                        marginRight: "1rem",
                    }}>
                        Sell
                    </Button>
                    <Button sx={{
                        backgroundColor: "#8ecae6",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#219ebc",
                            color: "white",
                        },
                    }}>
                        Auto
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {props.next && (
            <Link component={RouterLink} to={props.next}>
              Next
            </Link>
          )}
          {props.previous && (
            <Link component={RouterLink} to={props.previous}>
              Previous
            </Link>
          )} */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ApiDataView;
