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

    const [status, setStatus] = useState('Free');
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
    const [bill, setBill] = useState(0);
    
    useEffect(() => {
        if (singleTable) {
            setStatus(singleTable.status);
            setPeopleAmount(singleTable.peopleAmount);
            setMaxPeopleAmount(singleTable.maxPeopleAmount);
            setBill(singleTable.bill);
        }
    }, [singleTable]);

    const handlePeopleAmout = (e) => {
        if (e < 0 || isNaN(e)) {
            e = "0" ;
        }
        if (e > Number(maxPeopleAmount)) {
            e = maxPeopleAmount;
        }
        setPeopleAmount(e);
    };

    const handleMaxPeopleAmount = (e) => {
        if (e < 0 || isNaN(e)) {
            e = "0"
        }
        if (e > maxPeopleAmount) {
            e = maxPeopleAmount;
        }
        setMaxPeopleAmount(e);
        if (Number(peopleAmount) > e) {
            setPeopleAmount(e);
        }
    };


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
        return <Spinner animation="border" variant="primary" />;

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='my-3'>
                <strong>Table {singleTable.id}</strong>
            </h1>
            <div className='mt-4 d-flex w-50 align-items-center'>
                <FormLabel className='mb-0 me-3'>
                    <strong>Status:</strong>
                </FormLabel>
                <FormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
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
                <FormControl type="text" value={peopleAmount} className='w-25 text-center'  onChange={(e) => handlePeopleAmout(e.target.value)}/>
                <p className='mx-2 mb-0'>/</p>
                <FormControl type="text" value={maxPeopleAmount} className='w-25 text-center' onChange={(e) => handleMaxPeopleAmount(e.target.value)}/>
            </div>
                <div className='mt-4 d-flex w-25 align-items-center'>
                <FormLabel className='mb-0 me-4'>
                    <strong>Bill:</strong>
                </FormLabel>
                <p className='me-1 mb-0'>$</p>
                <FormControl type="text" value={bill} className='w-25 text-center' onChange={(e) => setBill(e.target.value)} />
                </div>
            <Button type='submit' className='mt-4'>
                Update
            </Button>
        </form>
        );
}
export default Table;