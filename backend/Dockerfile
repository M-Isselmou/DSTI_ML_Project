FROM python:3.12

WORKDIR /api

# Copy requirements and install dependencies
COPY ./backend_requirements.txt .
RUN pip install --no-cache-dir --upgrade -r backend_requirements.txt

# Copy the application source code
COPY ./ ./

# Set environment variables for Flask
ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=3001

CMD ["flask", "run"]