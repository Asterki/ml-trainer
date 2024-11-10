from flask import Flask
from flask_cors import CORS

from router.index import RouterService

class App:
    def __init__(self, port=3000, debug=True):
        self.port = port
        self.debug = debug
        self.app = Flask(__name__)

        # Enable CORS
        CORS(self.app, resources={r"/*": {"origins": "*"}})

        # Register current app routes
        RouterService().register_routes_to_app(self.app)

    def run(self):
        self.app.run(port=self.port, debug=self.debug)


if __name__ == "__main__":
    app = App()
    app.run()
