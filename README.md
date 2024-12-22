# DeepTect

DeepTect is a video analysis platform designed to detect deepfake content using restnet and MTCNN Model. The application leverages Docker and NVIDIA GPU acceleration for optimal performance.

## Prerequisites

Before using DeepTect, ensure you have the following installed on your system:

1. **Docker Engine**: [Install Docker Engine](https://docs.docker.com/engine/install/ubuntu/)
2. **NVIDIA Docker**: [Install NVIDIA Docker](https://github.com/NVIDIA/nvidia-docker)

## Setup and Installation

### 1. Backend Server

Navigate to the `server` directory:
```bash
cd /server
```

Build the Docker image:
```bash
docker build -t <name> .
```
Replace `<name>` with your desired Docker image name.

### 2. Running the Backend

To run the backend server with the preprocessed model, execute the following command:
```bash
docker run -d -p 5000:5000 --runtime=nvidia --ipc=host --rm --volume <DATA_ROOT>/frontend/upload:/dataset -it <name>
```
Replace `<DATA_ROOT>` with the path to your data directory and `<name>` with the name of your Docker image.

### 3. Frontend Setup

Navigate to the `frontend` directory:
```bash
cd /frontend
```

Install the required dependencies:
```bash
npm install
```

Start the frontend server:
```bash
node server.js
```

## Usage

1. Access the DeepTect platform via your browser at `http://localhost:3000`.
2. Upload a video file (supported formats: MP4, AVI, MOV) with a maximum size of 100MB.
3. Wait for the system to analyze the video and provide detection results.

## Development Notes

- The backend server processes videos using a deepfake detection model. Ensure the volume is mounted correctly to share data between the frontend and backend.
- The application is optimized for systems with NVIDIA GPUs for accelerated inference.

## Troubleshooting

- **Docker Image Build Issues**: Ensure Docker and NVIDIA Docker are installed and configured properly.
- **Frontend Server Errors**: Verify that all dependencies are installed and the correct ports are open.
- **Model Not Loading**: Check the volume path and ensure the model files are correctly placed in the dataset directory.

## Contributing

Feel free to contribute to DeepTect by submitting issues or pull requests on our GitHub repository.

## License

DeepTect is licensed under the MIT License. See the LICENSE file for more details.

