"use client"

import { useState, useEffect, useCallback } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplashScreen from "@/screens/SplashScreen"
import RootNavigation from "@/screens/RootNavigation"
import { View } from "lucide-react-native"
import AuthScreen from "@/screens/AuthScreen"

export default function App() {
  const [isSplash, setIsSplash] = useState(true)

  // Utilisation de useCallback pour éviter les recréations de fonction à chaque rendu
  const hideSplash = useCallback(() => {
    setIsSplash(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(hideSplash, 3000)

    return () => clearTimeout(timer) // Clear le timer si le composant est démonté
  }, [hideSplash])

  if (isSplash) {
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider>
        <RootNavigation />
        
    </SafeAreaProvider>
    
  )
}
