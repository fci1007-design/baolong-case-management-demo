#!/usr/bin/env python3
"""Serve the isolated browser-local demo; no application backend."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import webbrowser

parser = argparse.ArgumentParser()
parser.add_argument('--open', action='store_true')
parser.add_argument('--port', type=int, default=4173)
args = parser.parse_args()
handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).parent / 'dist'))
for port in range(args.port, args.port + 10):
    try:
        server = ThreadingHTTPServer(('127.0.0.1', port), handler)
        break
    except OSError:
        continue
else:
    raise SystemExit('沒有可用的展示連接埠，請使用 --port 指定其他連接埠。')
url = f'http://127.0.0.1:{port}'
print(f'寶隆 Demo：{url}', flush=True)
if args.open:
    webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
