import pyautogui
while 1:
    for i in range(10000):
        pyautogui.moveTo(10000, 50, duration=1)
        print(i)
    pyautogui.alert("End of Loop")
cal