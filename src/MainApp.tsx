import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/core/Pagination";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

function MainApp(props: any) {
  let [loading, setLoading] = useState(true);
  let [books, setBooks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(
    Number(props.match.params.items)
  );
  const [totalItems, setTotalItems] = React.useState(10);
  let [pageNumber, setpageNumber] = useState(Number(props.match.params.page));
  useEffect(() => {
    setpageNumber(Number(props.match.params.page));
    setItemsPerPage(Number(props.match.params.items));
    const fetchBody =
      encodeURIComponent("page") +
      "=" +
      encodeURIComponent(props.match.params.page) +
      "&" +
      encodeURIComponent("itemsPerPa") +
      "=" +
      encodeURIComponent(props.match.params.items);
    fetch("http://nyx.vima.ekt.gr:3000/api/books", {
      method: "Post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: fetchBody,
    })
      .then((data) => data.json())
      .then((result) => {
        setLoading(false);
        setBooks(result.books);
        setTotalItems(+(result.count/props.match.params.items).toFixed(0))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params]);
  const handleChangeItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.history.push(
      `/books&page=${props.match.params.page}&items=${
        event.target.value as number
      }`
    );
    setItemsPerPage(event.target.value as number);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.history.push(
      `/books&page=${value}&items=${props.match.params.items}`
    );
    setpageNumber(value);
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" color="primary" gutterBottom>
        Books List
      </Typography>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        {!loading &&
          books.map((book: any) => {
            return (
              <Grid item xs={3} key={book.id}>
                <Card
                  sx={{
                    minHeight:"200px",
                    margin: "1rem 0",
                    background: "rgb(51, 51, 51)",
                    color: "white",
                  }}
                  key={book.id}
                >
                  <CardContent>
                    <Typography variant="h5" noWrap component="div">
                      {book.book_title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Author:{book.book_author[0]} in{" "}
                      {book.book_publication_year}
                    </Typography>
                    <Typography variant="body2">
                      Location:
                      {book.book_publication_country},
                      {book.book_publication_city}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      pages:{book.book_pages}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        container
        direction="row"
        columnSpacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item>
          <h3>Items per page</h3>
        </Grid>
        <Grid item>
          <FormControl>
            <Select value={itemsPerPage} onChange={handleChangeItems}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Pagination count={totalItems} color="primary" page={pageNumber} onChange={handleChange} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainApp;
