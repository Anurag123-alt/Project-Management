import { useState } from "react";

const Reducer = (state, action) => {
    switch (action.type) {
        case "setTodo":
            return action.payload


        default: return state;

    }


}
export default Reducer;