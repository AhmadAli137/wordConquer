from fastapi import FastAPI
#import nltk
#ynltk.download("words")
import requests
from pprint import pprint
from nltk.corpus import words
import json
import random
import time
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

# Get the directory of the script
script_dir = Path(__file__).parent.absolute()

print("Script Directory: ", script_dir)
print("Current Working Directory: ", os.getcwd())
wkdir = os.getcwd()

word_list = words.words()
with open(f"{script_dir}/words_dictionary.json", "r") as json_file:
    # Use json.load() to parse the JSON data into a Python dictionary
    data = json.load(json_file)

spelling_bee_words = [
    "aberration",
    "accommodate",
    "apprehension",
    "benevolent",
    "caramel",
    "dilemma",
    "eccentric",
    "fascination",
    "garrulous",
    "hierarchy",
    "iridescent",
    "juxtapose",
    "kaleidoscope",
    "labyrinth",
    "magnanimous",
    "necessitate",
    "obnoxious",
    "perseverance",
    "quintessential",
    "recumbent",
    "serendipity",
    "tangential",
    "ubiquitous",
    "vexatious",
    "whimsical",
    "xylophone",
    "yacht",
    "zealous",
]


def generate_subwords(word):
    """
    Generate all possible subwords of a given word.
    A subword is any contiguous sequence of characters within the word.
    """
    length = len(word)
    return {word[i : j + 1] for i in range(length) for j in range(i, length)}


def find_dictionary_subwords(word, dictionary):
    """
    Find all subwords of 'word' that are present in the 'dictionary'.
    """
    subwords = generate_subwords(word)
    return [subword for subword in subwords if subword in dictionary]


# Create an instance of the FastAPI class
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the specific origins you want to allow
    allow_methods=[
        "*"
    ],  # You can specify specific methods if needed (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify specific headers if needed
)


# Define a route with a GET request method
@app.get("/api/")
async def read_root():
    return {"message": "Hello, FastAPI!"}


@app.get("/api/create_response/")
async def create_response():
    # get json from words_dictionary.json

    # print()
    # word = random.choice(list(data.keys()))
    # print(word)
    # word = requests.get("https://random-word.ryanrk.com//api/en/word/random").json()[0]
    word = random.choice(spelling_bee_words)
    print(word)
    response = requests.get(
        f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    ).json()[0]
    # while response['title'] == "No Definitions Found":
    #         word = random.choice(list(data.keys()))
    #         print(word)
    #         response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}").json()[0]
    #         time.sleep(0.5)
    try:
        title = response.get("word", "Word Not Found")
        phonetics = response.get("phonetics", [{}])[0].get(
            "text", "Phonetics Not Found"
        )
        audio = response.get("audio", [{}])
        print(audio)
        definition = (
            response.get("meanings", [{}])[0]
            .get("definitions", [{}])[0]
            .get("definition", "Definition Not Found")
        )
        letter_count = len(title)
        patterns = find_dictionary_subwords(title, list(data.keys()))
        patterns = [item for item in patterns if len(item) > 3]
        patterns.remove(title)
        patterns.extend(random.choice(list(data.keys())) for i in range(5))
        random.sample(patterns, len(patterns))
        print(patterns)
        # pprint({
        #     "title": title,
        #     "phonetics": phonetics,
        #     # "audio": audio,
        #     "definition": definition,
        #     "letterCount": letter_count,
        #     "patterns": patterns,
        # })
        return {
            "title": title,
            "phonetics": phonetics,
            "audio": audio,
            "definition": definition,
            "letterCount": letter_count,
            "patterns": patterns,
        }
    except Exception as e:
        print("Error:", e)
        return {
            "title": "Error Occurred",
            "phonetics": "Error Occurred",
            "audio": "Error Occurred",
            "definition": "Error Occurred",
            "letterCount": 0,
            "patterns": [],
        }


