# PowerShell script to start both the frontend and backend for development

Write-Host "Starting FastAPI backend and React frontend..." -ForegroundColor Green

# Start FastAPI in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\react_variant\backend'; uvicorn main:app --reload"

# Start React frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\react_variant\frontend\my-react-frontend'; npm run dev"

Write-Host "Development servers started!" -ForegroundColor Green
Write-Host "FastAPI: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "React: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in each terminal window to stop the servers when done." -ForegroundColor Yellow
