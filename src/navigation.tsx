/* eslint-disable react-hooks/exhaustive-deps */
import PolkadotIcon from '@/assets/img/polkadotIcon.svg?react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { routes } from '@/lib/utils'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { TbLoaderQuarter } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { BookOpenText, Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { collectiveClient } from './clients'

import { SiElement } from 'react-icons/si'
import { Resources } from './Resources'

const linkStyle = (pathname: string, link: string) => {
  return `link ${
    pathname === link
      ? 'bg-accent text-accent-foreground rounded-md'
      : 'text-muted-foreground'
  }`
}

interface Props {
  lightClientLoaded: boolean
  setLightClientLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navigation = ({
  lightClientLoaded,
  setLightClientLoaded,
}: Props) => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded])

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[14rem] flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-left gap-1 overflow-y-scroll">
        <div className="sticky top-0 flex text-primary p-4 font-extrabold text-2xl backdrop-blur-sm bg-transparent">
          <PolkadotIcon
            className="max-h-[100%] w-12"
            width={'2.2rem'}
            height={'2.2rem'}
          />
        </div>
        <div className="px-2">
          {routes.map((r) => {
            return (
              <Link
                key={r.link}
                className={
                  linkStyle(pathname, '/' + (r.link || '')) +
                  ' flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 '
                }
                to={r.link}
              >
                <r.icon className="h-5 w-5" />
                <div className="left">{r.name}</div>
              </Link>
            )
          })}
          <Link
            target="_blank"
            to="https://polkadot-fellows.github.io/RFCs/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start"
          >
            <BookOpenText className="h-5 w-5" />
            RFCs Book
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start"
            to="https://matrix.to/#/#fellowship-members:parity.io"
            target="_blank"
          >
            <SiElement className="h-5 w-5" />
            Fellowship Members
          </Link>
          <Link
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start"
            to="https://matrix.to/#/#fellowship-open-channel:parity.io"
            target="_blank"
          >
            <SiElement className="h-5 w-5" />
            Open Channel
          </Link>
          <Resources />
        </div>
      </nav>
      <nav className="mt-auto flex flex-row justify-center items-center gap-8 px-2 sm:py-5 backdrop-blur-sm bg-transparent">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FaGithub
                className="h-5 w-5"
                onClick={() =>
                  window.open('https://github.com/polkadot-fellows', '_blank')
                }
              />
              <span className="sr-only">Github</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="top">Github</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90  stroke-white/60 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem]  stroke-black/50  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Toggle theme</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {!lightClientLoaded ? (
                <TbLoaderQuarter className="h-5 w-5 animate-spin" />
              ) : (
                <FaCheckCircle className="text-[#00b300]" />
              )}
              <span className="sr-only">
                Light Client {!lightClientLoaded ? `syncing` : `synced`}
              </span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="top">
            Light Client {!lightClientLoaded ? `syncing` : `synced`}
          </TooltipContent>
        </Tooltip>
      </nav>
      <div className="text-xs text-foreground/40 absolute w-full bottom-1 flex flex-row justify-center items-center">
        <div>Polkadot Technical Fellowship ©2024</div>
      </div>
    </aside>
  )
}
