import "../css/Game.css"

import { useAppContext } from "../context/context"

const Game = () => {
  const context = useAppContext()

  return <>
    <h1>Hello from game</h1>
    { context?.image
      && <>
        <h2>Selected image:</h2>
        {/* <Popover> */ }
        {/*   <PopoverTrigger> */ }
        {/*     <img */ }
        {/*       alt="Selected image from the Profile" */ }
        {/*       src={ context?.image } */ }
        {/*       id="selectedImage" */ }
        {/*     /> */ }
        {/*   </PopoverTrigger> */ }

        {/*   <PopoverSurface> */ }
        {/*     <List */ }
        {/*   </PopoverSurface> */ }
        {/* </Popover> */ }
      </> }
  </>
}

export default Game
