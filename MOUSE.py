import pyautogui
while 1:
    for i in range(50):
        pyautogui.moveTo(0, 50, duration=1)
        pyautogui.moveRel(0, 900, duration=1)
        pyautogui.moveRel(1900, 0, duration=1)
        pyautogui.moveRel(0, -900, duration=1)

