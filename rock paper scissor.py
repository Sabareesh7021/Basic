import random
u = 0
s = 0
while u < 10 and s < 10:
    choice = ["ROCK", "PAPER", "SCISSOR"]
    system = (random.randint(0, 2))
    system_input = choice[system]
    print("System choice:", system_input)
    user = input("User:").upper()
    if user in choice:
        if (user == "PAPER" and system_input == "ROCK") or (user == "ROCK" and system_input == "SCISSOR") or (user == "SCISSOR" and system_input == "PAPER"):
            u += 1
            print("user point:", u)
            print("system point:", s)
        elif (user == "ROCK" and system_input == "PAPER") or (user == "SCISSOR" and system_input == "ROCK") or (user == "PAPER" and system_input == "SCISSOR"):
            s += 1
            print("user point:", u)
            print("system point:", s)
        else:
            print("Tie")
            print("user point:", u)
            print("system point:", s)
    else:
        print("Invalid input")
    if u == 10:
        print("user wins")
    if s == 10:
        print("system wins")
