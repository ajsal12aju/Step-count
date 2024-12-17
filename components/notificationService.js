import * as Notifications from "expo-notifications";

// Configure how notifications are handled when they are received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request Notification Permissions
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
};

// Schedule a Notification at a Specific Time
export const scheduleNotification = async (time, message) => {
  const [hours, minutes] = convertTo24HourFormat(time);
  const trigger = new Date();
  trigger.setHours(hours);
  trigger.setMinutes(minutes);
  trigger.setSeconds(0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: message || "It's time for your reminder!",
    },
    trigger,
  });
};

// Convert "4:38 pm" to 24-hour format
const convertTo24HourFormat = (timeString) => {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12;
  if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

  return [hours, minutes];
};
