
// selectors

export const getAllTables = state => state.tables;
export const getTableById = ({ tables }, id) => tables.find((table) => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;

// action names

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLES = createActionName('EDIT_TABLES');

// action creators

export const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const editTables = payload => ({ type: EDIT_TABLES, payload});
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
  };
};

export const editTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'app/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch('http://localhost:3131/tables' + '/table/' + options)
    .then(() => dispatch(editTables(newTable)))
  };
};

// action creators
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [ ...action.payload]
    case EDIT_TABLES:
      return [ ...action.payload]
    default:
      return statePart;
  };
};
export default tablesReducer;