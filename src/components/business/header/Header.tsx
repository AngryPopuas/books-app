import { ModeToggle } from "../theme/theme-switch/ThemeSwitch"

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-[10px] border-b">
        <h1>BookStore</h1>
        <ModeToggle/>
    </header>
  )
}

export default Header