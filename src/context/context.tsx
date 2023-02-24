import { createContext, FC, ReactNode, useContext, useReducer } from "react"

interface Action {
  type: string
  payload: any
}

interface State {
  image: string
}

const switcher    = {
  default    : () => console.error( "Unhandled action type" ),
  "set image": ( state: State, { payload } ) => ( {
    ...state,
    image: payload,
  } ),
}
const cartReducer = ( state: State, action: Action ) =>
  ( switcher[ action.type ] || switcher.default )( state, action )

const CartContext = createContext<State>( null )

const CartDispatchContext = createContext( null )

export const ContextProvider: FC<{ children: ReactNode }>
               = ( { children } ) => {
  const [ state, dispatch ]
          = useReducer( cartReducer, {
    image: "",
  } )

  return (
    <CartContext.Provider value={ state }>
      <CartDispatchContext.Provider value={ dispatch }>
        { children }
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export const useAppContext  = () => useContext( CartContext )
export const useAppDispatch = () => useContext( CartDispatchContext )
