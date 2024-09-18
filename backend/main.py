import uvicorn

if __name__ == "__main__":
    # running the server 
    # reload=True is used to reload the server when the code changes
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
