import Table from 'react-bootstrap/Table'
// import {getAllRecords} from '../http/testAPI'


const TableProps = (prop) => {
  const {count} = prop
  //  console.log(data)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>OS</th>
          <th>Create Data</th>
          <th>Update Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{count * 3}</td>
          <td>d</td>
          <td>d</td>
          <td>sdljvnb</td>
        </tr>
      </tbody>
    </Table>
  )
}
export default TableProps
