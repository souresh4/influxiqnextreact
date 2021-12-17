
const axios = require('axios')
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button
} from "@material-ui/core";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      // const data = await axios.post(
      //   "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api3/getnextuserslist", data
      // );
      // console.log(data.data);

      var data = {
        "db": "data_pece",
        "condition": {
          "limit": 10,
          "skip": 0
        },
        "sort": {
          "type": "desc",
          "field": "_id"
        }
      }
      const dataset = axios.post('https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api3/getnextuserslist', data)
        .then((response) => {
          console.log("success444", response);
          // listingDataSource = response.data.results.res;
          setProduct(response.data.results.res);
        })
        .catch(err => console.log("error", err))
     
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <TableContainer component={Paper}>
        <Table className="tablecls" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >E-mail</StyledTableCell>
              <StyledTableCell>Phone No.</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item.first_name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <>
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      {item.first_name +' '+item.lastName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.phone}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.gender}
                    </StyledTableCell>
                  </StyledTableRow>
                  <div>
                  <Button variant="contained" color="primary" type="submit">
                        Edit
                    </Button>
                  </div>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;