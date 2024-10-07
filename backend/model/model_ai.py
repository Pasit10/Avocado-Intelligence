import tensorflow as tf

from constant import constants

def load_model_age():
    try:
        model_age = tf.keras.models.load_model(constants.PATH_MODEL_AGE)
        model_age.load_weights(constants.PATH_WEIGHTS_AGE)
    except FileNotFoundError:
        print("[Model]: cannot download model or wights age")
    return model_age

def load_model_race():
    try:
        with open(constants.PATH_MODEL_RACE, 'r') as json_file:
            loaded_model_json = json_file.read()

        model_race = tf.keras.models.model_from_json(loaded_model_json)
        model_race.load_weights(constants.PATH_WEIGHTS_RACE)
    except FileNotFoundError:
        print("[Model]: cannot download model or wights race")
        return
    return model_race