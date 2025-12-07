import asyncio
import subprocess
from typing import List


async def run_adb_async(args: List[str]):
    print(" ".join(args))
    proc = await asyncio.create_subprocess_exec(
        "adb", *args,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT
    )
    print("Started:", proc.pid)
    while True:
        line = await proc.stdout.readline()
        if not line:
            break
        print(line.decode().strip())
    await proc.wait()
    print("Exited:", proc.pid)
    return proc


def run_adb(args: List[str]):
    try:
        args.insert(0, "adb")
        # result = subprocess.run(args, capture_output=True, text=True, check=True)
        result = subprocess.run(args, shell=True)
        # return result.stdout.strip()
        return ""
    except subprocess.CalledProcessError as e:
        print(f"ADB command failed: {e}")
        print(f"Error output: {e.stderr}")
        return None


def run_adb_str(command: str):
    """
    Run an ADB command and return its output.
    `command` should not include the 'adb' prefix.
    Example: 'devices', 'shell getprop ro.build.version.release'
    """
    full_command = ["adb"] + command.split()
    try:
        result = subprocess.run(full_command, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"ADB command failed: {e}")
        print(f"Error output: {e.stderr}")
        return None

# Example usage:
# output = run_adb("connect 127.0.0.1:16544")
# output = run_adb("devices")
# print("Connected devices:")
# print(output)
#
# # Run a shell command on the device
# android_version = run_adb("shell getprop ro.build.version.release")
# print("Android version:", android_version)
