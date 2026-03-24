from pprint import pprint

# not using pandas for scifest one as there is an issue with the encoding between microsoft + pandas

def gender_check(gender : str) -> str:
    if gender == "Prefer not to say":
        return "Other"
    
    return gender

def hour_to_float(hour : str) -> float:
    match hour: 
        case "Less than 1 hour":
            return 1.0 
        case "1-2 hours":
            return 1.5 
        case "3-4 hours":
            return 3.5
        case "5-6 hours":
            return 5.5 
        case "7-8 hours":
            return 7.5 
        case "9-10 hours":
            return 9.5  
        case "More than 10 hours": 
            return 10.0 
        case "I don't use any other device":
            return 0
        case _: 
            print(f"missing -> {hour}")

def year_to_age(year : str) -> int: 
    match year: 
        case "1st Year":
            return 13
        case "2nd Year":
            return 14
        case "3rd Year":
            return 15
        case "4th Year (Transition Year)":
            return 16
        case "5th Year":
            return 17
        case "6th Year (incl: LCVP)":
            return 18



with open("Artefact/datasets/ty_scifest_screentime.csv", "r", encoding="utf-8") as csv:
    for line in csv.readlines(): 
        data = [row.replace("\xa0", "").strip() for row in line.split(",")]

        id = data[0]
        gender = gender_check(data[1])
        age = year_to_age(data[2]) # yr group -> age
        devices = data[3].split(";")
        phone_hours = hour_to_float(data[5]) # str hour -> fl+
        other_hours = hour_to_float(data[6])

        #pprint(data)
        #print(age)
        #print(devices)
        print(gender)