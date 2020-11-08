from flask import Flask
from flask import send_file, jsonify, request
from helperCosineAndIncetion import getInceptionV3, inferenceOverImage, getCosineSimilarityLoss
import os
import numpy as np

app = Flask(__name__)

cosineLoss = None
modelInceptionV3NN = None

@app.route('/')
def apiHome():
    return jsonify({
        "serviceOn": True
    })

@app.route('/get-mom-dad-child', methods=['POST'])
def apiUploadAndInfere():
    try:
        dad = request.files['dad']
        mom = request.files['mom']
        child = request.files['child']

        dad.save('./static/data_dad.jpg')
        mom.save('./static/data_mom.jpg')
        child.save('./static/data_child.jpg')

        dad = './static/data_dad.jpg'
        mom = './static/data_mom.jpg'
        child = './static/data_child.jpg'

        dadInfere = inferenceOverImage(dad, modelInceptionV3NN)
        momInfere = inferenceOverImage(mom, modelInceptionV3NN)
        childInfere = inferenceOverImage(child, modelInceptionV3NN)

        os.remove(dad)
        os.remove(mom)
        os.remove(child)

        dadChild = float(-1 * cosineLoss(dadInfere, childInfere))
        momChild = float(-1 * cosineLoss(momInfere, childInfere))

        dadInfere = None
        momInfere = None
        childInfere = None

        if dadChild > momChild:
            return jsonify({
                "dad": True,
                "mom": False,
                "success": True
            })
        else:
            return jsonify({
                "dad": False,
                "mom": True,
                "success": True
            })
        
    except Exception as e:
        print(e)
        return jsonify({
                "dad": False,
                "mom": False,
                "success": False
            })

if __name__ == '__main__':
    cosineLoss = getCosineSimilarityLoss()
    modelInceptionV3NN = getInceptionV3()

    print("The moodel & cosine loss are setup!")

    app.run()