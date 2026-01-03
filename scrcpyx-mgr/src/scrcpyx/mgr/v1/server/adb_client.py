import asyncio
import subprocess
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class AdbResult:
    returncode: int
    stdout: Optional[str] = None
    stderr: Optional[str] = None


async def run_adb_async(args: List[str], stream_output: bool = True) -> AdbResult:
    proc = await asyncio.create_subprocess_exec(
        "adb", *args,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT if stream_output else asyncio.subprocess.PIPE
    )

    print("Started:", proc.pid, " ".join(args))

    try:
        if stream_output:
            # live streaming mode
            while True:
                line = await proc.stdout.readline()
                if not line:
                    break
                print(line.decode().strip())

            await proc.wait()
            return AdbResult(proc.returncode)

        else:
            # capture mode
            stdout, stderr = await proc.communicate()
            return AdbResult(
                proc.returncode,
                stdout.decode().strip(),
                stderr.decode().strip() if stderr else ""
            )

    except asyncio.CancelledError:
        # 🔥 cancellation path — kill the subprocess
        print(f"Cancelling, killing ADB process {proc.pid}")
        proc.kill()

        try:
            await proc.wait()
        except Exception:
            pass
    finally:
        print("Exited:", proc.pid, " ".join(args))


async def run_adb_wit_ret(args: List[str]):
    # Start the process
    process = await asyncio.create_subprocess_exec(
        "adb", *args,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )

    # Wait for the process to finish and capture output
    stdout, stderr = await process.communicate()

    # Decode output
    stdout = stdout.decode().strip()
    stderr = stderr.decode().strip()

    return process.returncode, stdout, stderr


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
