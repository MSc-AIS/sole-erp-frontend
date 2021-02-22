import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const entitySlice = createSlice({
    name: 'entity',
    initialState: {
        entities: [],
        loading: false,
        entityError: null,
    },
    reducers: {
        fetchEntitiesStart: state => {
            state.loading = true;
        },
        fetchEntitiesSuccess: (state, action) => {
            state.entities = action.payload;
            state.loading = false;
        },
        fetchEntitiesFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addEntity: (state, action) => {
            state.entities.concat(action.payload);
        },
        updateEntity: (state, action) => {
            state.entities.map(entity => {
                return entity.userId === action.payload.entityId ?
                    action.payload :
                    entity;
            });
        },
        deleteEntity: (state, action) => {
            state.entities = state.entities
                .filter(e => e.entity_id !== action.payload);
        },
    }
});


const { fetchEntitiesStart, fetchEntitiesSuccess, fetchEntitiesFail,
    addEntity, updateEntity, deleteEntity } = entitySlice.actions;

//  async actions with thunk
export const fetchEntitiesCollection = tokenId => dispatch => {
    const fetchEntities = async () => {
        dispatch(fetchEntitiesStart());

        const response = await fetch(`${baseURL}entities?tokenId=${tokenId}`);

        !response.ok ?
            dispatch(fetchEntitiesFail(response.status)) :
            dispatch(fetchEntitiesSuccess(await response.json()));
    }

    fetchEntities().catch(error => console.log(error));
};


//  selectors
export const entitiesSelector = state => state.entity;

//  export the reducer to the central store
export default entitySlice.reducer;
