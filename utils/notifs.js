import React from 'react'
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

const NOTIFICATION_KEY = "Decks:notifications"

function createNotification() {
    return {
      title: "Take your quiz!",
      body: "👋 Don't forget to take your quiz today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: "high",
        sticky: false,
        vibrate: true,
      },
    };
  }

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
               
              if (status === 'granted') {
                  //Notifications.cancelAllScheduledNotificationsAsync()
                    
                /*let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)) */
              }
            })
        }
      })
  }

  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
      .then(() => console.log("clear fired"))
  }

  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

