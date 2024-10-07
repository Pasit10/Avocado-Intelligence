import tensorflow as tf
import os

from constant import constants

def load_model_age():
    model_age = None
    try:
        # Check if constants and paths exist
        if not hasattr(constants, 'PATH_MODEL_AGE') or not os.path.exists(constants.PATH_MODEL_AGE):
            raise FileNotFoundError(f"[Model]: Model path '{constants.PATH_MODEL_AGE}' not found or not defined")

        if not hasattr(constants, 'PATH_WEIGHTS_AGE') or not os.path.exists(constants.PATH_WEIGHTS_AGE):
            raise FileNotFoundError(f"[Model]: Weights path '{constants.PATH_WEIGHTS_AGE}' not found or not defined")

        # Load the model and its weights
        model_age = tf.keras.models.load_model(constants.PATH_MODEL_AGE)
        model_age.load_weights(constants.PATH_WEIGHTS_AGE)
        print("[Model Age]: Model and weights loaded successfully")

    except FileNotFoundError as e:
        print(f"[Error]: {e}")
    except AttributeError as e:
        print(f"[Error]: Constants not properly defined: {e}")
    except Exception as e:
        print(f"[Error]: An unexpected error occurred: {e}")

    return model_age

def load_model_race():
    try:
        # Check if constants and paths exist
        if not hasattr(constants, 'PATH_MODEL_RACE') or not os.path.exists(constants.PATH_MODEL_RACE):
            raise FileNotFoundError(f"[Model]: Model path '{constants.PATH_MODEL_RACE}' not found or not defined")

        if not hasattr(constants, 'PATH_WEIGHTS_RACE') or not os.path.exists(constants.PATH_WEIGHTS_RACE):
            raise FileNotFoundError(f"[Model]: Weights path '{constants.PATH_WEIGHTS_RACE}' not found or not defined")

        # Load the model and its weights
        with open(constants.PATH_MODEL_RACE, 'r') as json_file:
            loaded_model_json = json_file.read()

        model_race = tf.keras.models.model_from_json(loaded_model_json)
        model_race.load_weights(constants.PATH_WEIGHTS_RACE)

        print("[Model Race]: Model and weights loaded successfully")
    except FileNotFoundError:
        print("[Model]: cannot download model or wights race")
        return
    return model_race