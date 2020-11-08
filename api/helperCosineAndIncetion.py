import keras
from keras.models import Model
import tensorflow as tf
import numpy as np

def getInceptionV3():
    # get the inception V3 model
    modelInceptionV3 = keras.applications.InceptionV3(weights='imagenet')

    # remove the last layer
    modelInceptionV3OutLayer = modelInceptionV3.layers[len(modelInceptionV3.layers)-2].name
    modelInceptionV3NN =  Model(inputs=modelInceptionV3.input, outputs=modelInceptionV3.get_layer(modelInceptionV3OutLayer).output) 
    return modelInceptionV3NN

def inferenceOverImage(path_to_image, modelInceptionV3NN):
  img_raw = tf.io.read_file(path_to_image)
  img = tf.io.decode_image(img_raw)
  img = tf.image.convert_image_dtype(img, tf.float32)
  img = tf.image.resize(img, [299,299])
  img = np.expand_dims(img, 0)
  return modelInceptionV3NN.predict(img)

def getCosineSimilarityLoss():
  return tf.keras.losses.CosineSimilarity(axis=1)