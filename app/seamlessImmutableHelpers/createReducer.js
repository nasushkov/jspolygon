import Immutable, { isImmutable } from 'seamless-immutable';

export default function createReducer(initialState, handlers, enforceImmutable = true) {
    return (state = initialState, action) => {
        const handler = (action && action.type && handlers.hasOwnProperty(action.type))
            ? handlers[action.type]
            : undefined;

        if (!handler) {
            return state;
        }

        if (!isImmutable(state)) {
            state = Immutable(state);
        }

        const result = handler(state, action);

        if (enforceImmutable && !isImmutable(state)) {
            return TypeError('Reducer must return immutable objects.');
        }

        return result;
    }
}
