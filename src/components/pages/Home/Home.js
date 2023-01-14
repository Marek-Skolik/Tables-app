import { getAllTables } from "../../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {

    const tables = useSelector(getAllTables)

    return (
    <div>
      {tables.map((table) => {
        return (
          <div key={table.id} className='mt-3 py-3 d-flex align-items-end border-bottom border-2 border-secondary'>
            <h2 className='mr-3 mb-0'>Table {table.id}</h2>
            <p className='mx-3 mb-0'><strong>Status: </strong>{table.status}</p>
            <Link className='ms-auto' to={`/table/${table.id}`}>
              <Button>Show more</Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;