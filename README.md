# Udaci Cards
By Warren Runk

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Pre-Installation Notes

This has been designed and testing to work with iOS. It may work on android, but
given time constraints, android was not tested. It was primarily tested
with iPhone X simulator.

There is an issue with the bottom, tab navigation on iPhone X simulator
(the bottom looks cut off). This issues is fixed in later versions of react
navigation, but I was unable to get that working alongside the new, required
version of expo in time.

## Installation

Please make sure you have npm and yarn installed.

Then run `yarn install`

## Running

For this to work, you will need to run this on macOS.

First run `yarn start`

When the packager is loaded, press `i` to load the iOS simulator.

Note the application will start with no decks. The main list looks a
little bit weird until 3 or more decks are added.

Enjoy!

## Note on Notifications

The application will initialize a local notification for the following day on
install (when there is no async store data). This notification will be delayed
to the following day upon completion of a quiz.
