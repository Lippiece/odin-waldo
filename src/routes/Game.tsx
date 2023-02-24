import { Title1, Title2 } from "@fluentui/react-components"

import { useAppContext } from "../context/context"

const Game = () => {
  const context = useAppContext()
  return <>
    <Title1>Hello from game</Title1>
    { context?.image && <>
      <Title2>Selected image:</Title2>
      <img
        alt="selected"
        src={ context?.image }
      />
    </> }
  </>
}

export default Game
