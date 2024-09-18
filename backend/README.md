# Oslo Bysykkel REST API

A simple REST API built with FastAPI that exposes Oslo Bysykkel station data and availability.

## Prerequisites

- Python 3.7+
- pip

## Installation

1. **Navigate to the project directory**

   ```bash
   cd bysykkel-api/backend
   ```


2. **Create and activate a virtual environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

  On Windows:

  ```bash
   venv\Scripts\activate
  ```

3. **Install the dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**

  ```bash
    python main.py
  ```

5. **There are two endpoints available:**

   - GET `/stations` - Returns a list of all stations with their number of available bikes and locks.
   - GET `/stations/{name}` - Returns station data and available bikes and locks for a specific named station.

You can go to `http://127.0.0.1:8000/docs` to see the Swagger UI and test the endpoints.