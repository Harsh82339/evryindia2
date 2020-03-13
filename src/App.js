import React from 'react';
import { Navbar, Form, FormControl, } from 'react-bootstrap';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as AWS from 'aws-sdk';
import axios from 'axios';

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'dynamodb.us-east-2.amazonaws.com',
  accessKeyId: 'AKIAZFF6EZ2VJSUJI7W3',
  secretAccessKey: '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'
});

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      selectvalue: "",
      gridData: " ",
      url: " ",
      print: [],
      filterdata: [],
      
     }
  }

  setdata(e) {
    if (this.state.selectvalue == "File1") {
      this.setState({
        gridData: e,
        url: e.Items[0].display_data,

      })
       
      axios.get(this.state.url)
        .then(res => {
          this.setState({ print: res.data });
          console.log(this.state.print)
        });
    }
    else if (this.state.selectvalue == "File2") {
      this.setState({
        gridData: e,
        url: e.Items[1].display_data,

      })
      axios.get(this.state.url)
        .then(res => {
          this.setState({ print: res.data });
          console.log(this.state.print)
        });


    }
    else if(this.state.selectvalue == "File3"){
      this.setState({
        gridData: e,
        url: e.Items[2].display_data,

      })
      axios.get(this.state.url)
        .then(res => {
          this.setState({ print: res.data });
          console.log(this.state.print)
        });


      }
      else if(this.state.selectvalue == "default"){
        this.setState({
          gridData: e,
          url: e.Items[1].display_data
        })
        axios.get(this.state.url)
          .then(res => {
            this.setState({ print: res.data });
            console.log(this.state.print)
          });
  
        
      }
  }

  getdata() {
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();

    let that = this;
    let params = {
      TableName: "sample-try-table"
    };

    this.docClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        that.setdata(data);
      }
    });

  };


  onClick=(e)=> {
    this.setState({ selectvalue: e.target.value });
    console.log(this.state.selectvalue )
    this.getdata();

  }


  render() {
    const filterdata = this.state.print;
 

    return (
      
      <div className="App">
        <div>
          <Navbar bg="dark" variant="dark">
            <Form inline>
              <select
                value={this.state.selectValue}
                onChange={this.onClick}
              >
                <option value="default">Select</option>
                <option value="File1">File1</option>
                <option value="File2">File2</option>
                <option value="File3">File3</option>
              </select>
             
            </Form>
          </Navbar>
        </div>
        <Table responsive hover>
          <thead>
            <tr>
              <th scope="col">Franchise</th>
              <th scope="col">Brand</th>
              <th scope="col">Division</th>
              <th scope="col">Forecast</th>
              <th scope="col">P10</th>
              <th scope="col">P50</th>
              <th scope="col">P90</th>
            </tr>
          </thead>
          <tbody>
            {filterdata.map((user) =>
              <tr>
                <td>{user.Franchisce}</td>
                <td>{user.Brand}</td>
                <td>{user.division}</td>
                <td>{user.Forecastdata}</td>
                <td>{user.p10}</td>
                <td>{user.p50}</td>
                <td>{user.p90}</td>
              </tr>
            )}
          </tbody>
        </Table>


      </div>

    )

  }
}
export default App;
