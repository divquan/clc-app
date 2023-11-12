// ScreenTimeTracker.js
import React, { useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import BackgroundTimer from "react-native-background-timer";

const ScreenTimeTracker = (WrappedComponent, screenName) => {
  const startTimeRef = useRef(null);

  const startTracking = () => {
    startTimeRef.current = new Date().getTime();
    BackgroundTimer.start();
  };

  const stopTracking = () => {
    if (startTimeRef.current) {
      const endTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.floor(
        (endTime - startTimeRef.current) / 1000
      );
      console.log(
        `Time spent on ${screenName}: ${elapsedTimeInSeconds} seconds`
      );
      BackgroundTimer.stop();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      startTracking();
      return () => {
        stopTracking();
      };
    }, [])
  );

  return (props) => <WrappedComponent {...props} />;
};

export default ScreenTimeTracker;
