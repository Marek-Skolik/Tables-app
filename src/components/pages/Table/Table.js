import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTableById, editTableRequest } from "../../../redux/tablesRedux";
import { FormLabel, FormSelect, FormControl, Button, Spinner } from "react-bootstrap";

const Table = () => {

    const { id } = useParams();

    const singleTable = useSelector (state => getTableById(state, id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState(singleTable.status);
    const [peopleAmount, setPeopleAmount] = useState(singleTable.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(singleTable.maxPeopleAmount);
    const [bill, setBill] = useState(singleTable.bill);

    useEffect(() => {
        if (singleTable !== undefined) {
            setStatus(singleTable.status);
            setPeopleAmount(singleTable.peopleAmount);
            setMaxPeopleAmount(singleTable.maxPeopleAmount);
            setBill(singleTable.bill);
        }

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedTable = {
          id,
          status,
          peopleAmount,
          maxPeopleAmount,
          bill,
        };
        dispatch(editTableRequest(editedTable));
        navigate('/');
    };

    if(!singleTable)
        return <Spinner animation="border" variant="primary" />

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='my-3'>
                <strong>Table {singleTable.id}</strong>
            </h1>
            <div className='mt-4 d-flex w-50 align-items-center'>
                <FormLabel className='mb-0 me-3'>
                    <strong>Status:</strong>
                </FormLabel>
                <FormSelect value={singleTable.status}>
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
                <FormControl type="text" value={singleTable.peopleAmount} className='w-25 text-center' />
                <p className='mx-2 mb-0'>/</p>
                <FormControl type="text" value={singleTable.maxPeopleAmount} className='w-25 text-center' />
            </div>
                <div className='mt-4 d-flex w-25 align-items-center'>
                <FormLabel className='mb-0 me-4'>
                    <strong>Bill:</strong>
                </FormLabel>
                <p className='me-1 mb-0'>$</p>
                <FormControl type="text" value={singleTable.bill} className='w-25 text-center'/>
                </div>
            <Button type='submit' className='mt-4'>
                Update
            </Button>
        </form>
        );
}
export default Table;