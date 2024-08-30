import { Navigation } from '@/navigation'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/header'
import { Theme, ThemeProvider } from './components/theme-provider'
import { useLocalStorage } from 'usehooks-ts'
import { Toaster } from '@/components/ui/sonner'
import '@/App.css'
import '@/index.css'
import { Content } from '@/Content'
import { useState } from 'react'
import { AccountContextProvider } from './contexts/AccountContextProvider'

const App = () => {
  const [lightClientLoaded, setLightClientLoaded] = useState<boolean>(false)

  const [settings] = useLocalStorage('fellowship-settings', {
    themeMode: 'light',
  })

  return (
    <>
      <ThemeProvider defaultTheme={settings?.themeMode as Theme}>
        <AccountContextProvider>
          <TooltipProvider>
            <div className="relative flex min-h-screen w-full flex-col bg-muted/40">
              <Navigation
                lightClientLoaded={lightClientLoaded}
                setLightClientLoaded={setLightClientLoaded}
              />
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-[14rem]">
                <Header
                  lightClientLoaded={lightClientLoaded}
                  setLightClientLoaded={setLightClientLoaded}
                />
                <Content />
              </div>
            </div>
          </TooltipProvider>
        </AccountContextProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
