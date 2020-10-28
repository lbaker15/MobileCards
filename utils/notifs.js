import React from 'react'
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

const NOTIFICATION_KEY = "Decks:notifications"

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {   
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                    
                Notifications.setNotificationHandler({
                  handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                  }),
                });

                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Take your quiz!",
                    body: "👋 Don't forget to take your quiz today!",
                  },
                  trigger: {
                    hour: 21,
                    minute: 0,
                    repeats: true
                  }
                })

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

