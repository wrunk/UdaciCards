import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

export const purple = '#292477'
export const black = '#000000'
export const gray = '#757575'
export const white = '#fff'
export const red = '#b71845'
export const orange = '#f26f28'
export const blue = '#4e4cb8'
export const lightPurp = '#7c53c3'
export const pink = '#b93fb3'

const decksMasterKey = 'decksmk'

// We should probably only be left with this function as redux
// will replace all the below
export function getDecksFromAStore(){
  return AsyncStorage.getItem(decksMasterKey).then((data) => {
    if(!data){
      // console.log("Warning: store was emtpy!")
      // See readme for details on notifications
      setLocalNotification()
      return []
    }
    console.log("Store was not emtpy")
    console.log(data)
    return JSON.parse(data)
  })
}

export function saveDecksToAStore(d){
  return AsyncStorage.setItem(decksMasterKey, JSON.stringify(d))
}

function createNotification () {
  return {
    title: 'Take a Quiz!',
    body: "Don't forget to quiz yourself today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

// Set this for the next day
export function setLocalNotification () {

  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(17)
        tomorrow.setMintutes(0)

        Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: tomorrow,
            repeat: 'day',
          }
        )
      }
    })
}
