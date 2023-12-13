export const initialState={
    user: null,sender:null,receiver:null,
};
export const reducer=(state,action) => {
    switch(action.type)
    {
        case "SET_USER":
            return({
                ...state,
                user:action.user
            });
            case "SET_Sender":
                return({
                    ...state,
                    sender:action.sender
                });
                case "SET_Receiver":
            return({
                ...state,
                receiver:action.receiver
            });
        default: 
            return state;
    }
}