import random
for j in range(4):
    random += str(random.randint(0, 9))
    condition = 'y'
    while condition.lower() == 'y':
        total_rabbit = 0
        total_tortoise = 0
        try:
            print("System generted number:", random)
            guess = input("Enter the guss:")
            if random == guess:
                print("Winner")
                for k in range(4):
                    random += str(random.randint(0, 9))
            elif [len(guess) == 4] and [type(guess) == int]:
                for i in range(0, 4):
                    if guess[i] in random:
                        if guess[i] == random[i]:
                            total_rabbit += 1
                        elif guess[i] != random:
                            total_tortoise += 1
                print("Number of rabbit", total_rabbit)
                print("Number of tortoise", total_tortoise)
            else:
                print("Invalid input")
            condition = input("Do you want to continue: ").lower()
        except condition == 'n':
            exit()
        while condition != 'y' and condition != 'n':
            print("Invalid numbers")
            condition = (input("Do you want to continue: ").lower())
