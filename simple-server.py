#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class WebflowHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    os.chdir(os.getcwd())
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), WebflowHandler) as httpd:
            print(f"🟢 Serving Webflow template on port {PORT}")
            print(f"📂 Directory: {os.getcwd()}")
            httpd.serve_forever()
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)