from flask import Flask, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Directory is fixed to /dataset
    dataset_dir = "/dataset"

    if not os.path.isdir(dataset_dir):
        return jsonify({'error': 'Dataset directory does not exist.'}), 400

    # Path to the bash script
    bash_script = "predict_submission.sh"
    
    if not os.path.exists(bash_script):
        return jsonify({'error': 'Prediction script not found.'}), 500

    try:
        # Run the bash script with the fixed dataset directory
        result = subprocess.run(
            ["bash", bash_script, dataset_dir],
            capture_output=True,
            text=True,
            check=True
        )

        # Parse the output to create a response
        predictions = []
        for line in result.stdout.splitlines():
            if line.startswith("Filename:"):
                parts = line.split(", Label: ")
                if len(parts) == 2:
                    predictions.append({"filename": parts[0].replace("Filename: ", "").strip(), "label": parts[1].strip()})

        return jsonify(predictions), 200

    except subprocess.CalledProcessError as e:
        return jsonify({'error': 'Prediction script failed.', 'details': e.stderr.strip()}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
