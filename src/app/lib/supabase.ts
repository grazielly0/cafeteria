import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'
const supabaseUrl = "https://ioqmugedsxyximfdhjzp.supabase.com";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvcW11Z2Vkc3h5eGltZmRoanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTYzMzYsImV4cCI6MjA2NjM3MjMzNn0.hWDaxjibqlA4frjLW3iw-cZFtpZ007gqWESkVeziVdo";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
})

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})