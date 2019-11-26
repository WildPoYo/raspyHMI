#!/usr/bin/env python

# WS server example

import asyncio
import websockets
import json

print('Waiting for client')

async def hello(websocket, path):
    print('Client Connected')
    while True:
        try:
            #name = await websocket.recv()
            incoming = await websocket.recv()
            if incoming == 'isAlive':
                await websocket.send(incoming)
            print (incoming)
            print (type(incoming))
        except websockets.ConnectionClosed:
            print("Terminated")
            break
        x =  'Message Received'
        print(x)
        if incoming:
            await websocket.send(x)
        #print(f"< {name}")
        #greeting = f"Hello {name}!"

        #await websocket.send(greeting)
        #print(f"> {greeting}")

start_server = websockets.serve(hello, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
