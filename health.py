import platform
import time
import json
import sys

def check_system_health():
    """
    Simulates a backend health check for the portfolio microservices.
    Demonstrates Python proficiency for DevOps/Scripting.
    """
    status = {
        "service": "portfolio-backend-v2",
        "timestamp": time.time(),
        "status": "HEALTHY",
        "system": {
            "os": platform.system(),
            "release": platform.release(),
            "python_version": platform.python_version()
        },
        "metrics": {
            "uptime_seconds": 3600,
            "cpu_load": 0.45,
            "memory_usage_mb": 128
        }
    }
    
    # Simulate some logic
    if status["metrics"]["cpu_load"] > 0.8:
        status["status"] = "DEGRADED"
        
    return json.dumps(status, indent=2)

if __name__ == "__main__":
    print("Running System Diagnostics...")
    time.sleep(1)
    print(check_system_health())
    print("\n[INFO] System is ready for scaling.")
