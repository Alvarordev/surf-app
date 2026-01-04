import { configureStore, combineReducers } from '@reduxjs/toolkit'
import surfReducer from '@/features/surf-details/surfSlice'

const rootReducer = combineReducers({
  surf: surfReducer,
})

const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem('surf_app_state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('surf_app_state', serializedState)
  } catch {
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
})

store.subscribe(() => {
  saveState({
    surf: store.getState().surf,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
