import {createContext, Dispatch, FC, ReactNode, useContext, useReducer} from "react"

interface Action {
  type: string
  payload: any
}

interface State {
  image: string
  user: string
}

const switcher = {
  default    : () => console.error("Unhandled action type"),
  "set image": (state: State, {payload}) => ({
    ...state,
    image: payload,
  }),
  "set user": (state: State, {payload}) => ({
    ...state,
    user: payload,
  }),
}
const cartReducer = (state: State, action: Action) =>
  (switcher[ action.type ] || switcher.default)(state, action)

const CartContext = createContext<State>(undefined)

const CartDispatchContext = createContext<Dispatch<Action>>(undefined)

export const ContextProvider: FC<{ children: ReactNode }>
  = ({children}) => {
  const [ state, dispatch ]
    = useReducer(cartReducer, {
    image: "",
    user : "",
  })

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export const useAppContext = () => useContext(CartContext)
export const useAppDispatch = () => useContext(CartDispatchContext)
