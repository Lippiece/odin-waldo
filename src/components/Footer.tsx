import "../css/Footer.css"

import { Link, Title1 } from "@fluentui/react-components"

const Footer = () => {
  return (
    <footer>
      <Link href="https://www.theodinproject.com">
        <Title1>The Odin Project</Title1>
      </Link>
      <Link href="https://www.github.com/lippiece">
        <Title1>GitHub</Title1>
      </Link>
    </footer>
  )
}

export default Footer
