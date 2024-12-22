ARG PYTORCH="1.10.0"
ARG CUDA="11.3"
ARG CUDNN="8"
# Use an updated base image with a compatible Python version
FROM pytorch/pytorch:${PYTORCH}-cuda${CUDA}-cudnn${CUDNN}-devel

# Set environment variables
ENV TORCH_NVCC_FLAGS="-Xfatbin -compress-all"
ENV CMAKE_PREFIX_PATH="$(dirname $(which conda))/../"

# Set timezone to Malaysia and noninteractive build
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Kuala_Lumpur
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


# Add the missing NVIDIA GPG key
RUN apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/3bf863cc.pub

# Update package list and install required packages
RUN apt-get update && apt-get install -y \
    libglib2.0-0 libsm6 libxrender-dev libxext6 nano mc glances vim git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install cython
RUN conda install cython -y && conda clean --all

# Install packaging module (required for APEX)


# Upgrade pip


# Install APEX
# RUN pip show torch
RUN git clone https://github.com/NVIDIA/apex
ENV MAX_JOBS=4
RUN pip install ninja
# RUN pip install packaging
# RUN pip install -U pip
# RUN pip install --use-deprecated=legacy-resolver -v --no-cache-dir --config-settings="cpp_ext=True" ./apex
#RUN pip install -v --disable-pip-version-check --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./apex
# RUN pip install -v --no-cache-dir --config-settings="cpp_ext=True" ./apex
# RUN pip install -v --disable-pip-version-check --no-cache-dir --no-build-isolation --config-settings "--build-option=--cpp_ext" --config-settings "--build-option=--cuda_ext" ./apex

# RUN pip install -v --disable-pip-version-check --no-cache-dir --no-build-isolation --global-option="--cpp_ext" --global-option="--cuda_ext" ./apex


# Install essential build tools and libraries
RUN apt-get update -y
RUN apt-get install build-essential cmake -y
RUN apt-get install libopenblas-dev liblapack-dev -y
RUN apt-get install libx11-dev libgtk-3-dev -y

# Install Python dependencies
RUN pip install dlib
RUN pip install facenet-pytorch
RUN pip install albumentations==1.0.0 timm==0.4.12 pytorch_toolbelt tensorboardx
RUN pip install cython jupyter jupyterlab ipykernel matplotlib tqdm pandas

# Install PyTorch and torchvision
RUN pip install torch==1.13.1 torchvision==0.14.1
RUN pip install flask


# Download pretrained ImageNet models
RUN apt install -y wget
RUN wget https://github.com/rwightman/pytorch-image-models/releases/download/v0.1-weights/tf_efficientnet_b7_ns-1dbc32de.pth -P /root/.cache/torch/hub/checkpoints/
RUN wget https://github.com/rwightman/pytorch-image-models/releases/download/v0.1-weights/tf_efficientnet_b5_ns-6f26d0cf.pth -P /root/.cache/torch/hub/checkpoints/

# Setting the working directory
WORKDIR /workspace

# Copying the required codebase
COPY . /workspace

# Adjust permissions for scripts
RUN chmod 777 predict_submission.sh

# Set PYTHONPATH
ENV PYTHONPATH=.

# Expose port 5000 for Flask
EXPOSE 5000

# # Set default command
# CMD ["/bin/bash"]


CMD ["python3", "app.py"]