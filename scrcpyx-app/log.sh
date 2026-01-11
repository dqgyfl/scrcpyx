# Get PID
pid=$(adb shell pidof com.anonymous.ScrcpyX)
# Example output: 12345

# Show logcat for that PID
adb logcat --pid=$pid
