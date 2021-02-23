FROM python:3.9

# set default environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV LANG C.UTF-8

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
        tzdata \
        python3-setuptools \
        python3-pip \
        python3-dev \
        python3-venv \
        git \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# create and set working directory
RUN mkdir /pomodoro
WORKDIR /pomodoro


# install environment dependencies
RUN pip3 install --upgrade pip
RUN pip3 install psycopg2 pipenv

COPY requirements.txt .
RUN pip install -r requirements.txt

# copy docker-entrypoint.sh
COPY ./docker-entrypoint.sh ./docker-entrypoint.sh

# Add current directory code to working directory
ADD . .
EXPOSE 5000

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
