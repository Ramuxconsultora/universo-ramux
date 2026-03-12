#!/bin/bash
cd "$(dirname "$0")"
source vev/bin/activate
echo "---------------------------------------------------"
echo "  Starting CNV-Ramux Server..."
echo "  To stop the server, press Ctrl+C"
echo "---------------------------------------------------"
python3 server.py
echo ""
echo "Server stopped. Press Enter to close this window."
read
