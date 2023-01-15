import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { FormLabel, FormSelect, FormControl, Button } from "react-bootstrap";

const Table = () => {

    const { id } = useParams();

    const singleTable = useSelector (state => getTableById(state, id));


    return (
        <form>
            <h1 className='my-3'>
                <strong>Table {singleTable.id}</strong>
            </h1>

            <div className='mt-4 d-flex w-50 align-items-center'>
                <FormLabel className='mb-0 me-3'>
                    <strong>Status: </strong>
                </FormLabel>
                <FormSelect>
                    <option value='Free'>Free</option>;
                    <option value='Reserved'>Reserved</option>;
                    <option value='Busy'>Busy</option>;
                    <option value='Cleaning'>Cleaning</option>;
                </FormSelect>
            </div>

            <div className='mt-4 d-flex w-25 align-items-center'>
                <FormLabel className='mb-0 me-2'>
                    <strong>People:</strong>
                </FormLabel>
                <FormControl type='text' className='w-25 text-center'/>
                <p className='mx-2 mb-0'>/</p>
                <FormControl type='text' className='w-25 text-center'/>
            </div>
                <div className='mt-4 d-flex w-25 align-items-center'>
                <FormLabel className='mb-0 me-4'>
                    <strong>Bill:</strong>
                </FormLabel>
                <p className='me-1 mb-0'>$</p>
                <FormControl type='text' className='w-25 text-center'/>
                </div>
            <Button type='submit' className='mt-4'>
                Update
            </Button>
        </form>
    )
}
export default Table;